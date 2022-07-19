const { DataTypes } = require("sequelize");
const conexao = require("../config/sequelize"); //importo sequelize.js

const Foto = conexao.define(
  "Foto",
  {
    foto: {
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
    tableName: "fotos", //nome da tabela q vai estar ligado
  }
);

module.exports = Foto;
