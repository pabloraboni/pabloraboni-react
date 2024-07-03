//Criação model User (Espelho collection do banco de dados)

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    timestamps: true
  }
);

//Definindo Model User com o nome 'User' e o esquema criado acima 'userSchema', e depois exportando User para uso na controller.
const User = mongoose.model("User", userSchema);

module.exports = User;
