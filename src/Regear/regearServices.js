const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Fernando:dyNyg3v7sBkfUaIz@cluster0.o4xrnor.mongodb.net/Horda?retryWrites=true&w=majority&appName=Cluster0");

const Regear = mongoose.model("Regear", {
    Name: String,
    Link: String,
    Responsavel: String,
    Class: String,
    Status: String,
    MainHand: String,
    OffHand: String,
    Cabeca: String,
    Peitoral: String,
    Bota: String,
    Data: String,
    Dia: String,
    Capa: String,
    Bolsa: String,
    DataAceito: String,
    DataFinalizado: String,
    MsgStaff: String,
    bauRegear: String
});

module.exports ={
    
}