import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

// Acessando o models User
const models = [User];

class Database {

    constructor(){
        this.init();
    }

    init(){

        // Carregando as configurações do banco de dados criado.
        this.connection = new Sequelize(databaseConfig);

        // percorrendo o model atual e carregando ele com o banco de dados.
        models.map(model => model.init(this.connection))
    }
}

export default new Database();