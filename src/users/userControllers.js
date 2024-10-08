require('dotenv').config({path: '.env'});
const userServices = require('./userServices');

const axios = require('axios');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let cacheMembros = null;
let cacheTime = 0;
const CACHE_DURATION = 3000000;

module.exports ={
    addNewUser:async(req, res)=>{
        let json

        let Name= req.body.Name
        let Senha= req.body.Senha
        let Cargo= "Membro"
        let backgroundHorda= "Wlack"

        let senhaHash = await bcrypt.hash(Senha, 10);


        const newUser = await userServices.seveNewUser(Name, senhaHash, Cargo, backgroundHorda);        
        res.json(newUser);
    },
    getAllMembres: async (req, res) => {
        try {
            const now = Date.now();
            if (cacheMembros && (now - cacheTime) < CACHE_DURATION) {
                return res.json(cacheMembros);
            }

            const response = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/guilds/${process.env.ID_GUILDA}/members`, { timeout: 30000 });
            const json = response.data.map(membro => ({
                nome: membro.Name,
                id: membro.Id
            }));
            
            cacheMembros = json;
            cacheTime = now;

            res.json(json);
        } catch (error) {
            console.error('Erro ao fazer requisição:', error);
            res.status(500).json({ message: 'Erro ao obter membros da guilda' });
        }
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
            let backgroundHorda = nameChecks[0].backgroundHorda;

            const isValidPassword = await bcrypt.compare(SenhaNoHash.trim(), senhaHash.trim());
            if(isValidPassword){

                const secret = `${process.env.SECRET}`
                const token = jwt.sign({
                    idUser: id,
                    User: Nome,
                    Cargo: Cargo,
                    backgroundHorda: backgroundHorda
                },
                secret,{
                    expiresIn: 18000 // valido por 5 horas
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
    },
    checkToken:async(req,res)=>{
        let json={};
        const SECRET = process.env.SECRET

        let token = req.params.token
        try {
            const decodeToken = jwt.verify(token, SECRET);
            json={
                res: 200,
                idUser: decodeToken.idUser,
                User: decodeToken.User,
                Cargo: decodeToken.Cargo,
                backgroundHorda: decodeToken.backgroundHorda,
                token
            };
        } catch (error) {
            json={
                res: 502,
                idUser: 'None',
                User: 'None',
                Cargo: 'None',
                backgroundHorda: 'None',
                token: 'None'
            };
        }
        res.json(json);
    },
}