import express from "express";
import passport from 'passport';
import UserDTO from '../dao/DTO/users.dto.js';
export const loginRouter = express.Router();

loginRouter.get('/current', (req, res) => {
  const sessionUser = new UserDTO(req.session);
  return res.send(JSON.stringify(sessionUser));
});

//github
loginRouter.get("/github", passport.authenticate('github', { scope: ['user:email'] }));
loginRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/auth/error' }), 
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/products');
    });