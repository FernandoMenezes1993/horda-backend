const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Fernando:dyNyg3v7sBkfUaIz@cluster0.o4xrnor.mongodb.net/Horda?retryWrites=true&w=majority&appName=Cluster0");

const Usuarios = mongoose.model("Usuarios", {
    Name: String,
    Senha: String,
    Cargo: String,
    backgroundHorda: String
});

module.exports ={
    seveNewUser:async(Name, senhaHash, Cargo, backgroundHorda)=>{
        const newUser = new Usuarios ({
            Name: Name,
            Senha: senhaHash,
            Cargo: Cargo,
            backgroundHorda: backgroundHorda
        });
        await newUser.save();
        return newUser;
    },
    checksNickname:async(Nome)=>{
        const nomeVerificado = Usuarios.find({ Name: Nome });
        return nomeVerificado;
    } 
}