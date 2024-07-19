require('dotenv').config({path: '.env'});

const userControllers = require('./users/userControllers');
const regearControllers = require('./Regear/regearControlles')

const express = require('express');
const router = express.Router();
const cors = require('cors');


var corsOptions = {
    header:{
        'Access-Control-Allow-Origin': `${process.env.URL_LOCAL}`
    },
    origin: `${process.env.URL_LOCAL}`,
    optionsSuccessStatus: 200 
}

//Verificar token
router.get('/checks/:token', cors(corsOptions), userControllers.checkToken);

//GET

    //Usuarios
        router.get("/playresGuild", cors(corsOptions),userControllers.getAllMembres);
        //Pegar o nome e ID de todos os membros da A Horda

        router.get("/checks/name/:Nickname", cors(corsOptions), userControllers.checksName);
        //Verificar se o Nickname digitado já está cadastrado no mongoDB

        router.get("/checks/user/:Nickname/:Senha", cors(corsOptions), userControllers.checkUser);
        //Verificar credencias do usuario, criar topken e logar

    //Regears
        router.get('/get/regear/:Nickname', cors(corsOptions), regearControllers.getRegear);
        //Pega todas as solicitações de regear que esteja no Nickname

//POST
    router.post("/user/new", cors(corsOptions), userControllers.addNewUser);
    //Cadastra um novo jogador

    router.post("/create/regear",cors(corsOptions), regearControllers.createRegear);
    //Cadastrar um Re-gear

module.exports = router;