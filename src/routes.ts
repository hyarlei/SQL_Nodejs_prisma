import {Router} from 'express';
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
import { AuthController } from './controllers/AuthController';
import { AuthMiddleware } from './middlewares/auth';

const authController = new AuthController();

export const routes = Router();

//user routes
routes.get('/user', AuthMiddleware, UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

//auth routes
routes.post('/auth', authController.authenticate);

//post routes
routes.get('/post', PostController.index);
routes.get('/post/:id', PostController.show);
routes.post('/post', PostController.store);
routes.put('/post/:id', PostController.update);
routes.delete('/post/:id', PostController.destroy);

