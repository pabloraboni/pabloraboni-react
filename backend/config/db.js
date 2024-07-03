//Configuração conexão com o bando de dados criado em https://cloud.mongodb.com/ (plano free)

const mongoose = require("mongoose");

//connection
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.2lfkdra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        )
        console.log("Conectou-se ao banco!");

        return dbConn;

    } catch (error) {
        console.log(error);
    }
}

conn();

module.exports = conn;