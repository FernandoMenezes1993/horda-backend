require('dotenv').config({path: '.env'});
const regearServices = require('./regearServices');
const axios = require('axios');

const bodyParser = require('body-parser');
module.exports ={
    createRegear:async(req, res)=>{

        let Name= req.body.Name
        let Link= req.body.Link
        let Responsavel = "Horda"
        let Status = "Pendente"
        let Data = req.body.Data
        let Dia = req.body.Dia
        let Cabeca
        let Peitoral
        let Bota
        let MainHand
        let OffHand
        let capa
        let bolsa
        let fama
        let Vitima
        let Evento

        if (Link.includes('?')) {
            Link = Link.split('?')[0];
        }
    
        const parts = Link.split('/');
        const lastParameter = parts[parts.length - 1];
        Evento = lastParameter;
        try {
            const resposta = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/events/${lastParameter}`);

            MainHand = resposta.data.Victim.Equipment.MainHand ? resposta.data.Victim.Equipment.MainHand.Type : "Null";
            OffHand = resposta.data.Victim.Equipment.OffHand ? resposta.data.Victim.Equipment.OffHand.Type : "Null";
            Cabeca = resposta.data.Victim.Equipment.Head ? resposta.data.Victim.Equipment.Head.Type : "Null";
            Peitoral = resposta.data.Victim.Equipment.Armor ? resposta.data.Victim.Equipment.Armor.Type : "Null";
            Bota = resposta.data.Victim.Equipment.Shoes ? resposta.data.Victim.Equipment.Shoes.Type : "Null";
            capa = resposta.data.Victim.Equipment.Cape ? resposta.data.Victim.Equipment.Cape.Type : "Null";
            bolsa = resposta.data.Victim.Equipment.Bag ? resposta.data.Victim.Equipment.Bag.Type : "Null";
            fama = resposta.data.Victim.DeathFame;
            Vitima = resposta.data.Victim.Name;
        } catch (error) {
            res.json(500);
            return;
        }
        if(Name === Vitima){
            const ChecksEvento = await regearServices.ChecksEventoSxists(Evento);
            if(ChecksEvento.length > 0){
                res.json(404);
            }else{
                const newRegear = await regearServices.saveReger(Name, Link, Responsavel, Status, MainHand, OffHand, Cabeca, Peitoral, Bota, Data, Dia, capa, bolsa, fama, Evento);
            
                res.json(200);
            }
        }else{
            res.json(400);
        }
        
    },
    getRegear:async(req, res)=>{
        let Nickname= req.params.Nickname

        const regears = await regearServices.regears(Nickname);
        res.json(regears);
    },
    getRegerId:async(req, res)=>{
        let id = req.params.id
        const regear = await regearServices.getRegear(id);
        res.json(regear);
    },
    attStatusRegar:async(req,res)=>{
        let id = req.params.id
        let Responsavel= req.body.Responsavel
        let Status = req.body.Status
        let DataAceito = req.body.DataAceito


        const attRegear = await regearServices.attRegearAceito(id, Responsavel, Status, DataAceito);
        res.json(attRegear);
    },
    finalizaRegar:async(req, res)=>{
        let id = req.params.id

        let Status = req.body.Status
        let DataFinalizado = req.body.DataFinalizado 
        let MsgStaff = req.body.MsgStaff     
        

        const attRegear = await regearServices.regearFinalizado(id, Status, DataFinalizado, MsgStaff);
        res.json(attRegear);
    },
    getAllRegearStaff:async(req, res)=>{
        let json =[];
        const allRegears = await regearServices.getRegears();
        let regears = allRegears.length
        

        for(let i =0; i < regears; i++){
            if(allRegears[i].Status == "Pendente" || allRegears[i].Status == "Aceito"){
                json.push(allRegears[i])
            }
        }
        res.json(json);
    },
    regearResgatado:async(req,res)=>{
        let id = req.params.id        
        let Status = req.body.Status

        const attRegear = await regearServices.regearResgatado(id, Status);
        res.json(attRegear);
    },
    regearNegado:async(req,res)=>{
        let id = req.params.id        
        let Status = req.body.Status
        let MsgStaff = req.body.MsgStaff   

        const attRegear = await regearServices.regearNegado(id, Status, MsgStaff);
        res.json(attRegear);
    }
}