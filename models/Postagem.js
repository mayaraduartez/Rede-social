const { DataTypes } = require("sequelize");
const conexao = require("../config/sequelize"); //importo sequelize.js

const Postagem = conexao.define(
  "Postagem",
  {
    titulo: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    timestamps: false, //não cria o createdat e updatedat
    tableName: "postagens", //nome da tabela q vai estar ligado
  }
);

module.exports = Postagem;