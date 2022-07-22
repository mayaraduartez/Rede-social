const { DataTypes } = require("sequelize");
const conexao = require("../config/sequelize"); //importo sequelize.js

const Comunidade = conexao.define(
  "Comunidade",
  {
    foto: {
      type: DataTypes.STRING,
    },
    nome: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false, //não cria o createdat e updatedat
    tableName: "comunidade", //nome da tabela q vai estar ligado
  }
);

module.exports = Comunidade;
