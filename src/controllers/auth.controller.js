import { emailService } from "../services/email.service.js";
import { userService } from "../services/users.service.js";

class AuthController {
    getSession = (req, res) => {
        return res.send(JSON.stringify(req.session));
    }
    getLogin = (_, res) => {
        return res.render('home', {});
    }
    getRegister = (_, res) => {
        return res.render('register', {});
    }
    postRegister = async (req, res) => {
        if (!req.user) {
            return res.status(400).render('error', { code: 400, msg: "The user already exists in our database" });
        }
        req.session.user = req.user;
        await emailService.register({ email: req.user.email });

        return res.status(200).redirect('/products');
    }

    getFailRegister = async (_, res) => {
        return res
            .status(400)
            .render('error', { code: 400, msg: "Failed to register the user. User already exists" });
    }

    postLogin = async (req, res) => {
        if (!req.user) {
            return res
                .status(400)
                .render('error', { code: 400, msg: "Invalid credentials" })
        }
        req.session.user = req.user;
        await userService.updateLastConnection(req.user._id);

        return res.redirect('/products');
    }

    getFailLogin = async (req, res) => {
        return res
            .status(400)
            .render('error', { code: 400, msg: "Failed to login" });
    };

    getLogout = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
            }
            return res.redirect('/auth/login');
        });
    };

    getProfile = (req, res) => {
        const user = req.session.user;
        return res.render('perfil', { user: user });
    }
    getAdmin = (_, res) => {
        return res.send('datos super secretos clasificados sobre los nuevos ingresos a boca juniors');
    }
    getError = (_, res) => {
        return res.status(400).render('error', { code: 400, msg: "Error in the login" });
    }

    postRecovery = async (req, res) => {
        const { email } = req.body;
        const emailFound = await userService.getUserByEmail(email); //verifies that the email exists
        if (emailFound) {
            await emailService.createToken({ email });
        }
        return res.status(201).render('pass-success', { msg: `An email has been sent to ${email} with instructions for resetting your password. This email may take a few minutes to arrive in your inbox.` });
    };

    getRecovery = async (req, res) => {
        const { token, email } = req.query;
        const tokenFound = await emailService.findToken({ token, email }); //Verifies that the token exists

        if (tokenFound && tokenFound.expiration > Date.now()) {
            return res.status(201).render('pass-change', { email });
        }
        else {
            return res.status(201).render('pass-success', { msg: "The link has expired. Please try resetting your password again." });
        }
    };

    passReset = async (req, res) => {
        const { password, password2, email } = req.body;
        const result = await emailService.passChange({ email, password, password2 });
        return res.status(201).render('pass-success', { msg: result });
    };

}

export const authController = new AuthController();