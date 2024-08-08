const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Fernando:dyNyg3v7sBkfUaIz@cluster0.o4xrnor.mongodb.net/Horda?retryWrites=true&w=majority&appName=Cluster0");

const Regear = mongoose.model("Regear", {
    Name: String,
    Link: String,
    Responsavel: String,
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
    saveReger:async(Name, Link, Responsavel, Status, MainHand, OffHand, Cabeca, Peitoral, Bota, Data, Dia, Capa, Bolsa)=>{
        const newRegear = new Regear ({
            Name: Name,
            Link: Link,
            Responsavel: Responsavel,
            Status: Status,
            MainHand: MainHand,
            OffHand: OffHand,
            Cabeca: Cabeca,
            Peitoral: Peitoral,
            Bota: Bota,
            Data: Data,
            Dia: Dia,
            Capa: Capa,
            Bolsa: Bolsa,
            DataAceito: "None",
            DataFinalizado: "None",
            MsgStaff: "Null",
            bauRegear: "0"
        });
        await newRegear.save();
        return newRegear;
    },
    regears:async(Nickname)=>{
        const regears = Regear.find( { Name: Nickname } );
        return regears;
    },
    getRegear:async(id)=>{
        try {
            const regear = await Regear.findById(id);
            return regear;
        } catch (error) {
            console.error('Erro ao buscar Regear:', error);
            // Lidar com o erro de forma adequada, possivelmente lançando novamente ou retornando null
            throw error; // ou return null;
        }
    }   
}