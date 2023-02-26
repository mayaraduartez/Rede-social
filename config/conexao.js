const sequelize = require("sequelize");

const conexao = new sequelize(
  "database_development",
  "postgres",
  "postgres",
  {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
  }
);

module.exports = conexao;
