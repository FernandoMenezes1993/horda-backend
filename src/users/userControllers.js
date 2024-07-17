require('dotenv').config({path: '.env'});
const userServices = require('./userServices');

const axios = require('axios');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

module.exports ={
    addNewUser:async(req, res)=>{
        let json

        let Name= req.body.Name
        let Senha= req.body.Senha
        let Cargo= "Membro"

        let senhaHash = await bcrypt.hash(Senha, 10);


        const newUser = await userServices.seveNewUser(Name, senhaHash, Cargo);        
        res.json(newUser);
    },
    getAllMembres:async(req,res)=>{
        let json= [];

        try {
            const response = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/guilds/${process.env.ID_GUILDA}/members`, { timeout: 1000000 });
            const membros = response.data.length;

            for(let i = 0; i < membros; i++){
                let membro = {
                    nome: response.data[i].Name,
                    id: response.data[i].Id
                }
                json.push(membro);
            }
        } catch (error) {
            console.error('Erro ao fazer requisição:', error);
        }
        res.json(json);
    },
    checksName:async(req,res)=>{
        let json={
            length:0
        };
        let Nome = req.params.Nickname;
        const nameChecks = await userServices.checksNickname(Nome);
        
        if (nameChecks.length > 0) {
            //usuario ja cadastrado
            json={
                User:502
            };
        }else{
            //usuario não cadastrado
            json={
                User:404
            };
        }            
        res.json(json);
    },checkUser:async(req,res)=>{
        let json={
            res: 0
        }

        let Nome = req.params.Nickname;
        let SenhaNoHash = req.params.Senha;

        const nameChecks = await userServices.checksNickname(Nome);

        if (nameChecks.length > 0) {
            //Usuario encontrado
            let senhaHash = nameChecks[0].Senha;
            let id = nameChecks[0]._id.toString();
            let Cargo = nameChecks[0].Cargo;

            const isValidPassword = await bcrypt.compare(SenhaNoHash.trim(), senhaHash.trim());
            if(isValidPassword){

                const secret = `${process.env.SECRET}`
                const token = jwt.sign({
                    idUser: id,
                    User: Nome,
                    Cargo: Cargo
                },
                secret,{
                    expiresIn: 18000 // 1 minutos
                });
                //Senha ok
                json={
                    res: 200,
                    token: token
                }
            }else{
                //Senha errada
                json={
                    res: 502
                }
            }
        }else{
            // Usuario não encontrado
            json={
                res: 404
            }
        }
        res.json(json);
    }
}