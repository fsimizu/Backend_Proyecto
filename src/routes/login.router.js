import express from "express";
import { userService } from "../services/users.service.js";
export const loginRouter = express.Router();
// import { checkLogin } from "../functions/functions.js";
import { createHash, isValidPassword } from "../utils/passEncryption.js";
import passport from 'passport';
  
//este login ya no va (usamos passport)
loginRouter.post('/login', async (req, res) => {
    const { signInEmail: email, signInPassword: pass } = req.body;

    const foundUser = await userService.getUserByEmail(email);

    if (foundUser && isValidPassword ( pass , foundUser.pass ) ) {
        req.session.user = foundUser;

        res.redirect("/products")
    }
    else {
        res.status(400).render('error', {code: 400, msg: "Access denied"})
    }
})


loginRouter.post('/register', async (req, res) => {
    try {
        const { registerName: firstName, registerLastName: lastName, registerEmail: email, registerPass: password } = req.body;
        await userService.createUsers({ firstName, lastName, email, age, isAdmin, role, password: createHash(password) })

        // await alert("The user has been successfully registered");
        return res.redirect('/');

    } catch (error) {
        return res.status(400).render('error', { code: 400, msg: 'Error registering the user. The email already exists in our database'})
    }
})


loginRouter.get('/current', (req, res) => {
    return res.send(JSON.stringify(req.session));
});


loginRouter.get("/github", passport.authenticate('github', { scope: ['user:email'] }));
loginRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/auth/error' }), (req, res) => {
  req.session.user = req.user;
  // Successful authentication, redirect home.
  res.redirect('/products');
});
