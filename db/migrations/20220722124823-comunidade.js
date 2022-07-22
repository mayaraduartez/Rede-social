'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comunidade',{
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
      nome:{
        type: Sequelize.STRING,
      },
      descricao:{
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('comunidade');
  },
}; 
