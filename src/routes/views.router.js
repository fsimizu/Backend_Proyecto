import express from "express";
import { viewsController } from '../controllers/views.controller.js';
import { isAdmin, isUser } from "../middlewares/auth.js";
export const viewsRouter = express.Router();

viewsRouter.get('/', viewsController.getHome);
viewsRouter.get('/register', viewsController.getRegister);
viewsRouter.get('/profile', isUser , viewsController.getProfile);
viewsRouter.get('/admin', isAdmin, viewsController.getAdmin);
viewsRouter.get('/logout', viewsController.getLogout);
viewsRouter.get('/jwt-login', viewsController.getJwt);
viewsRouter.get('/pass-recovery', viewsController.getRecovery);
viewsRouter.get('/pass-change', viewsController.getChange);
