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

        const parts = Link.split('/');
        const lastParameter = parts[parts.length - 1];
        try {
            const resposta = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/events/${lastParameter}`);

            MainHand = resposta.data.Victim.Equipment.MainHand ? resposta.data.Victim.Equipment.MainHand.Type : "Null";
            OffHand = resposta.data.Victim.Equipment.OffHand ? resposta.data.Victim.Equipment.OffHand.Type : "Null";
            Cabeca = resposta.data.Victim.Equipment.Head ? resposta.data.Victim.Equipment.Head.Type : "Null";
            Peitoral = resposta.data.Victim.Equipment.Armor ? resposta.data.Victim.Equipment.Armor.Type : "Null";
            Bota = resposta.data.Victim.Equipment.Shoes ? resposta.data.Victim.Equipment.Shoes.Type : "Null";
            capa = resposta.data.Victim.Equipment.Cape ? resposta.data.Victim.Equipment.Cape.Type : "Null";
            bolsa = resposta.data.Victim.Equipment.Bag ? resposta.data.Victim.Equipment.Bag.Type : "Null";

        } catch (error) {
            res.status(500).send("500");
            return;
        }
        const newRegear = await regearServices.saveReger(Name, Link, Responsavel, Status, MainHand, OffHand, Cabeca, Peitoral, Bota, Data, Dia, capa, bolsa);

        res.json(200);
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
    }
    
}