const { boolean } = require("yup");

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.createTable('tasks', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tasks: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      check:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        References:{ model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        OnDelete: 'SET NULL',
        allowNull: false,
      },

      // Sequelize preenche automaticamente esses dois campos.
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {

    return queryInterface.dropTable('tasks');

  }
};

/*

yarn sequelize db:migrate -> Cria uma migrate
yarn sequelize db:migrate:undo -> apaga a ultima migrate
yarn sequelize db:migrate:undo:all -> apaga todas migrates

*/