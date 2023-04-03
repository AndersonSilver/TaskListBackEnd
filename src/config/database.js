module.exports ={
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    database: 'tasklist',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};

// Instalar bibliotela PG e pg-hstore
// yarn add pg pg-hstore