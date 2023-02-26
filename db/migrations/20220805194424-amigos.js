'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("amigos", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    datasolicitacao:{
      type: Sequelize.DATEONLY,
    },
    idsolicitante: {
      type: Sequelize.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    idsolicitado: {
      type: Sequelize.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    dataaceito:{
      type: Sequelize.DATEONLY,
    },
    situacao: {
      type: Sequelize.STRING,
    },
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("amigos");
  },
};
