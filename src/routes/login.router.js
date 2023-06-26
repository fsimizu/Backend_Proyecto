import express from "express";
import { UserModel } from "../dao/models/users.model.js";
import { userService } from "../services/users.service.js";
export const loginRouter = express.Router();
import { checkLogin } from "../functions/functions.js";

// loginRouter.get("/", (req, res) => {
//     const { user, pass } = req.query;
//     if (user === "Fernando") {
//         req.session.user = user;
//         req.session.admin = true;
//         return res.status(201).send('login success Fernando!'+ JSON.stringify(req.session));
//     }
//     else {
//         return res.status(201).send('login success unknown!');
//     }
// });


//No la necesito. pongo directamente en el home el login! 
// loginRouter.get('/login', (req, res) => {
//     res.render('login')
// })

loginRouter.get('/login', (req, res) => {
    const { username, password } = req.query;
    if (username !== 'pepe' || password !== 'pepepass') {
      return res.send('login failed');
    }
    req.session.user = username;
    req.session.admin = false;
    res.send('login success!');
  });

  

loginRouter.post('/login', async (req, res) => {
    const { signInEmail: email, signInPassword: pass } = req.body;
    const user = await userService.getUserByEmail(email,pass);


    if (user.length === 1) {
        req.session.user = user[0];
        console.log(req.session)
        res.redirect("/products")
        // res.send(JSON.stringify(req.session));
    }
    else {
        res.send("access denied")
    }

})



loginRouter.get('/register', (_, res) => {
    res.render('register')
})

loginRouter.post('/register', async (req, res) => {
    try {
        const { registerName: firstName, registerLastName: lastName, registerEmail: email, registerPass: pass } = req.body;
        await userService.createUsers({ firstName, lastName, email, pass });
        // alert("The user has been successfully registered") este alert da error
        return res.redirect('/');

    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "error registering the user",
            payload: {},
        })
    }
})


loginRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.json({ status: 'session eliminar ERROR' });
      }
      res.redirect('/');
    });
  });