import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import { decode } from 'punycode';


export default async (req,res,next) => {

    // Pega a informação que o usuario digitou no campo authorization la no postman e armazena na variavel.
    const authHeaders = req.headers.authorization;

    //Se não tem nada no campo de authorization ele retorna que nao existe
    if(!authHeaders){
        return res.status(401).json({error: 'Token não existe.'});
    }

    // Descarta a primeira posição bearer "iguinorando sua declaração e colocando virgula" e pega apenas o token.

    const [, token] = authHeaders.split(' ');

    try{

        // Verifica se o token informado no campo de authorization é igual ao token do usuario
        // Se for igual ele avança, se nao retorna um erro em formato Json.
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;

        return next();

    }catch(err){
        return res.status(401).json({error: 'Token invalido.'});
    }

    
}