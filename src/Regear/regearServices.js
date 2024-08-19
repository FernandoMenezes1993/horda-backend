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
    Fama: String,
    Evento: String
});

module.exports ={
    saveReger:async(Name, Link, Responsavel, Status, MainHand, OffHand, Cabeca, Peitoral, Bota, Data, Dia, Capa, Bolsa, fama, Evento)=>{
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
            Fama: fama,
            Evento: Evento
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
    },
    attRegearAceito:async(id, Responsavel, Status, DataAceito)=>{
        const updateReger = {
            Responsavel: Responsavel,
            Status: Status,
            DataAceito: DataAceito
        }
        const updatedRegear = await Regear.findByIdAndUpdate(id, updateReger);        
    },
    regearFinalizado:async(id, Status, DataFinalizado, MsgStaff)=>{
        const updateReger = {
            Status: Status,
            DataFinalizado: DataFinalizado,
            MsgStaff: MsgStaff          
        }
        const updatedRegear = await Regear.findByIdAndUpdate(id, updateReger);
    },
    getRegears:async()=>{
        const regears = await Regear.find();
        return regears;
    },
    ChecksEventoSxists:async(Evento)=>{
        const eventoVerificado = Regear.find({ Evento: Evento });
        return eventoVerificado;
    },
    regearResgatado:async(id, Status)=>{
        const updateReger = {            
            Status: Status            
        }
        const updatedRegear = await Regear.findByIdAndUpdate(id, updateReger);        
    },
    regearNegado:async(id, Status, MsgStaff)=>{
        const updateReger = {            
            Status: Status,
            MsgStaff: MsgStaff            
        }
        const updatedRegear = await Regear.findByIdAndUpdate(id, updateReger);        
    }
}