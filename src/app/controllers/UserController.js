import User from '../models/User';

class UserController {

    async Store(req, res) {

    //Esta indo la no banco de dados "User" e fazendo um procura "findOne" 
    //onde "Where" o email do banco de dados e igual ao email que o usuario digitou.

    const userExists = await User.findOne({
        where: { email: req.body.email },
    });

    //Se email existe no ele retorno um estatos 400 e manda uma mensagem em formato Json.
    if (userExists) {
        return res.status(400).json({ error: 'Usuario já existe.' });
    }

    //Declara 3 variaveis que será recebido pelo usuario "Req.Body" as informaçôes.
    const { id, name, email } = await User.create(req.body);

    return res.json({
        id,
        name,
        email,
    });
    //Retorna apenas as informaçoes acima em formato json..
    }
}

export default new UserController();
