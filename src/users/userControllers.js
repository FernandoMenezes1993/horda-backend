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
        let Discordid= req.body.Discordid

        let senhaHash = await bcrypt.hash(Senha, 10);


        const newUser = await userServices.seveNewUser(Name, senhaHash, Email, Cargo, Discordid);        
        res.json(newUser);
    }
}