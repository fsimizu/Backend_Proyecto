import express from "express";
import { UserModel } from "../dao/models/users.model.js";
import { userService } from "../services/users.service.js";
export const loginRouter = express.Router();
// import { checkLogin } from "../functions/functions.js";
import { createHash, isValidPassword } from "../utils/passEncryption.js";

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

// loginRouter.get('/login', (req, res) => {
//     const { username, password } = req.query;
//     if (username !== 'pepe' || password !== 'pepepass') {
//       return res.send('login failed');
//     }
//     req.session.user = username;
//     req.session.admin = false;
//     res.send('login success!');
//   });

  

loginRouter.post('/login', async (req, res) => {
    const { signInEmail: email, signInPassword: pass } = req.body;

    const foundUser = await UserModel.findOne( { email });
    // const user = await userService.getUserByEmail(email,pass);

    if (foundUser && isValidPassword ( pass , foundUser.pass ) ) {
        req.session.user = foundUser;

        res.redirect("/products")
    }
    else {
        res.status(400).render('error', {code: 400, msg: "Access denied"})
    }
})

// loginRouter.get('/register', (_, res) => {
//     res.render('register')
// })

loginRouter.post('/register', async (req, res) => {
    try {
        const { registerName: firstName, registerLastName: lastName, registerEmail: email, registerPass: pass } = req.body;
        //await userService.createUsers({ firstName, lastName, email, pass });

        await UserModel.create({ firstName, lastName, email, pass: createHash(pass) })

        // await alert("The user has been successfully registered");
        return res.redirect('/');

    } catch (error) {
        return res.status(400).render('error', { code: 400, msg: 'Error registering the user. The email already exists in our database'})
    }
})


// loginRouter.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.json({ status: 'session eliminar ERROR' });
//       }
//       res.redirect('/');
//     });
//   });

loginRouter.get('/current', (req, res) => {
    return res.send(JSON.stringify(req.session));
});