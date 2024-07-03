//Criação model Photo (Espelho collection do banco de dados)

const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
  },
  {
    timestamps: true
  }
);

//Definindo Model Photo com o nome 'Photo' e o esquema criado acima 'photoSchema', e depois exportando Photo para uso na controller.
const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
