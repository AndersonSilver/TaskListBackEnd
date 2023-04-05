import Sequelize, { Model} from 'sequelize';

class Task extends Model{
    static init(sequelize){
        super.init({
                task: Sequelize.STRING,
                check: Sequelize.BOOLEAN,
            },{
                sequelize,
            });
            return this;
    }

    static associate(Models){

        // A nova tarefa pertença a algum usuario
        this.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user'});
    }


}

export default Task;