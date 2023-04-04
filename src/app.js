import express from 'express';
import routes from './routes';

// Importando a conexão do banco de dados
import './database';

class App{
    constructor(){
        this.server = express();

        this.midlewares();
        this.routes();
    }

    midlewares(){
        //Fazendo com que o express le informaçoes no formato Json.
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;