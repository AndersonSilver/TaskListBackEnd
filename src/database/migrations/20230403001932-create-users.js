module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Um unico email cadastrado !
      },
      password_hash:{
        type: Sequelize.STRING,
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

    return queryInterface.dropTable('users');

  }
};

/*

yarn sequelize db:migrate -> Cria uma migrate
yarn sequelize db:migrate:undo -> apaga a ultima migrate
yarn sequelize db:migrate:undo:all -> apaga todas migrates

*/