import User from '../models/User';
import * as Yup from 'yup'; // Biblioteca para autenticação dos campo.

class UserController {

    async Store(req, res) {

    // Faz as verificações do campo came, email resenha, usando a biblioteca YUP.
        const Schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required()
            .email()
            .required(),
            password: Yup.string()
            .required()
            .min(6),
        })

    // Se alguma verificação acima estiver fora ele da erro.
        if(!(await Schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na Validação.' });
        }

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

    async Update(req,res){

        const Schema = Yup.object().shape({

            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
            .min(6)
            .when('oldPassword', (oldPassword, field)=>
                oldPassword 
                ? field.required()
                : field
            ),
            confirmPassword: Yup.string().when('password', (password, field)=>
            
                password
                ? field.required().oneOf([Yup.ref('password')]) //
                : field
            ),
        });

        if(!(await Schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na Validação.' });
        }

        const { email, oldPassword} = req.body;

        const user = await User.findByPk(req.userId);

        if(email !== user.email){

            //Esta indo la no banco de dados "User" e fazendo um procura "findOne" 
            //onde "Where" o email do banco de dados e igual ao email que o usuario digitou.

            const userExists = await User.findOne({
                where: { email },
            });

            //Se email existe no ele retorno um estatos 400 e manda uma mensagem em formato Json.
            if (userExists) {
                return res.status(400).json({ error: 'Usuario já existe.' });
            }
        }

        // Se tiver alguma coisa que o usuario mandou dentro da variavel oldPassword
        // ele ira continuar fazer a proxima verificação
        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({ error: 'Senha Incorreta.' });
        }

        //Pega as informaçoes do body e atualiza no bando dentro das variaveis declaradas "id, name".
        const { id, name } = await user.update(req.body);


        // Retornando em formato json as variaveis do banco descrito.
        return res.json({
            id, 
            name,
            email,
        });
    }
}

export default new UserController();
