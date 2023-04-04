import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model{
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            },
        );

        // após toda criação de um ususrio será executado essa função
        // antes de ser criado o banco de dados.

        this.addHook('beforeSave', async user => {
            if(user.password){

                // user.password_hash é referente o que esta no banco,
                // a função abaixo irá criptografar a senha que o usuario
                //digitou com uma força de 8 para nao pesar muito o servidor.

                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        });

        return this;
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;