const sequelize = require("sequelize");

const conexao = new sequelize(
  "redesocial_development",
  "postgres",
  "postgres",
  {
    host: "localhost",
    port: "5433",
    dialect: "postgres",
  }
);

module.exports = conexao;
