require('dotenv').config({path: '.env'});

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
const porta = process.env.PORT || 3000;

var corsOptions = {
  header:{
      'Access-Control-Allow-Origin': `${process.env.URL_LOCAL}`
  },
  origin: `${process.env.URL_LOCAL}`,
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', router);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conexão com MongoDB estabelecida com sucesso!");
    app.listen(porta, () => {
      console.log(`Servidor rodando na porta ${porta}`);
      console.log(`Cors liberado para url ${process.env.URL_LOCAL}`)
    });
  })
  .catch(err => {
    console.error("Falha ao conectar com MongoDB", err);
});