import express from "express";
import { isUser, isAdmin } from "../../middlewares/auth.js";
export const viewsRouter = express.Router();

viewsRouter.get('/', (req, res) => {
    // const {firstName, email, role} = req.session.user ? req.session.user : "";
    // return res.status(201).render('home', { firstName, email, role });
    return res.status(201).render('home');
  });

viewsRouter.get('/register', (_, res) => {
    res.render('register')
})

viewsRouter.get('/profile', isUser, (_, res) => {
    res.render('profile')
})

viewsRouter.get('/admin', isAdmin, (_, res) => {
    res.render('admin')
})

viewsRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.render('error', {code: 500 , msg: 'Error closing the session'});
      }
      res.redirect('/');
    });
});


viewsRouter.get('/jwt-login', (req, res) => {
  return res.render('jwt-login');
});


// viewsRouter.get('/error', (_, res) => {
//     res.render('error', {status: 500 , msg: 'Error closing the session'})
// })