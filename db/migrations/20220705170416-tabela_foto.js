'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('fotos',{
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao:{
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.DATEONLY, //apenas data
        defaultValue: Sequelize.NOW, //vai cadastrar a data de hoje na hr de add a foto do db
      },
      idusuario:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {//no migration down apaga a tabela
    await queryInterface.dropTable('fotos');
  },
};
