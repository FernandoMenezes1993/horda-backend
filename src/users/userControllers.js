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
        let Email= req.body.Email
        let Cargo= "Membro"

        let senhaHash = await bcrypt.hash(Senha, 10);


        const newUser = await userServices.seveNewUser(Name, senhaHash, Email, Cargo);        
        res.json(newUser);
    },
    getAllMembres:async(req,res)=>{
        let json= [];

        try {
            const response = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/guilds/${process.env.ID_GUILDA}/members`, { timeout: 200000 });
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
    }
}