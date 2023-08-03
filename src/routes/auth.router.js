import express from 'express';
import passport from 'passport';
import { authController } from '../controllers/auth.controller.js';
import { isAdmin, isUser } from '../middlewares/auth.js';
export const authRouter = express.Router();

authRouter.get('/session', authController.getSession);

//register
authRouter.get('/register', authController.getRegister);
authRouter.post('/register', passport.authenticate('register',  { failureRedirect: '/auth/failregister' }), authController.postRegister);
authRouter.get('/failregister', authController.getFailRegister);

//login
authRouter.get('/login', authController.getLogin);
authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), authController.postLogin);
authRouter.get('/faillogin', authController.getFailLogin);

//github
// authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
// authRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/auth/error' }), 
//     (req, res) => {
//         req.session.user = req.user;
//         res.redirect('/products');
//     });

authRouter.get('/logout', authController.getLogout);
authRouter.get('/perfil', isUser, authController.getProfile);
authRouter.get('/administracion', isUser, isAdmin, authController.getAdmin);
authRouter.get('/error', authController.getError);