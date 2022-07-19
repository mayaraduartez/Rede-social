'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('postagens',{
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      titulo: {
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
      UsuarioId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "usuarios", key:"id"},//chave estrangeira, o id
        onUpdate: "CASCADE", //se eu alterar o pai o filho altera
        onDelete: "CASCADE", // se eu apagar o pai o filho apaga
      },
    });
  },

  async down (queryInterface, Sequelize) {//no migration down apaga a tabela
    await queryInterface.dropTable('postagens');
  },
};
