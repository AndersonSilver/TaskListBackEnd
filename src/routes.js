import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.Store);
routes.post('/sessions', SessionController.Store);

//todas as rotas abaixo do middleware precisa de autenticação.
routes.use(authMiddleware);

routes.put('/users', UserController.Update);

export default routes;