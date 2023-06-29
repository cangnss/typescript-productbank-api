import * as express from 'express';
import { AuthController } from '../controllers/AuthController';

const authRoutes = express.Router();
const authController = new AuthController();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);

export { authRoutes };