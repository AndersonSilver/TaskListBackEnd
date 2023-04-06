import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TasksController';

const routes = new Router();

routes.post('/users', UserController.Store);
routes.post('/sessions', SessionController.Store);

//todas as rotas abaixo do middleware precisa de autenticação.
routes.use(authMiddleware);

routes.put('/users', UserController.Update);

routes.post('/tasks', TaskController.Store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);

export default routes;