const { DataTypes } = require("sequelize");
const conexao = require("../config/conexao");

const Amigo = conexao.define(
    "Amigo", //não precisa dados de autoincremento: id
    {
        datasolicitacao: {
            type: DataTypes.DATEONLY,
        },
        dataaceito: {
            type: DataTypes.DATEONLY,
        },
        situacao: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false, //sequelize trabalha com timestamps 'não cria data de atualização'
        tableName: "amigos",
    }
);

module.exports = Amigo;