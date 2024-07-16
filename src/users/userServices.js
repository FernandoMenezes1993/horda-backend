const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Fernando:dyNyg3v7sBkfUaIz@cluster0.o4xrnor.mongodb.net/Horda?retryWrites=true&w=majority&appName=Cluster0");

const Usuarios = mongoose.model("Usuarios", {
    Name: String,
    Senha: String,
    Email: String,
    Cargo: String
});

module.exports ={
    seveNewUser:async(Name, senhaHash, Email, Cargo)=>{
        const newUser = new Usuarios ({
            Name: Name,
            Senha: senhaHash,
            Email: Email,
            Cargo: Cargo
        });
        await newUser.save();
        return newUser;
    }   
}