import express from 'express';
import passport from 'passport';
import { isUser, isAdmin } from '../../middlewares/auth.js';
export const authRouter = express.Router();

authRouter.get('/session', (req, res) => {
    return res.send(JSON.stringify(req.session));
});

authRouter.get('/register', (_, res) => {
    return res.render('register', {});
});


authRouter.post('/register', passport.authenticate('register',  { failureRedirect: '/auth/failregister' }),  (req, res) => {
    if (!req.user) {
        return res.json({ error: 'The user already exists in our database' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };

    return res.json({ msg: 'ok', payload: req.user });
});

authRouter.get('/failregister', async (_, res) => {
    return res.json({ error: 'fail to register' });
});

authRouter.get('/login', (req, res) => {
    return res.render('home', {});
});

authRouter.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), 
    async (req, res) => {
        if (!req.user) {
            return res.json({ error: 'invalid credentials' });
        }
        req.session.user = { 
            _id: req.user._id, 
            email: req.user.email, 
            firstName: req.user.firstName, 
            lastName: req.user.lastName, 
            isAdmin: req.user.isAdmin 
        };
        return res.redirect('/products');
        // return res.json({ msg: 'ok', payload: req.user });
    });

authRouter.get('/faillogin', async (req, res) => {
    return res.json({ error: 'fail to login' });
});

authRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
        }
        return res.redirect('/auth/login');
    });
});

authRouter.get('/perfil', isUser, (req, res) => {
    const user = req.session.user;
    return res.render('perfil', { user: user });
});

authRouter.get('/administracion', isUser, isAdmin, (req, res) => {
    return res.send('datos super secretos clasificados sobre los nuevos ingresos a boca juniors');
});

authRouter.get('/error', (_, res) => {
    return res.status(400).render('error', { code: 400, msg: "Error in the login" });
});