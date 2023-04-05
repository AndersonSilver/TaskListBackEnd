import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Task from '../app/models/Task';

// Acessando o models User
const models = [User, Task];

class Database {

    constructor(){
        this.init();
    }

    init(){

        // Carregando as configurações do banco de dados criado.
        this.connection = new Sequelize(databaseConfig);

        // percorrendo o model atual e carregando ele com o banco de dados.
        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
        // Percorre o model e verifica se tem o metodo associate, se tiver ele vai carregar a associação.

    }
}

export default new Database();