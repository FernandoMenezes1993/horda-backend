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

router.post("/user/new", cors(corsOptions), userControllers.addNewUser);

module.exports = router;