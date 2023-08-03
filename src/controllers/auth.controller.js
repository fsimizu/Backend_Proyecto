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
    postRegister = (req, res) => {
        if (!req.user) {
            return res
                .status(400)
                .render('error', {code: 400, msg: "The user already exists in our database"}) ;
        }
        req.session.user = { 
            _id: req.user._id, 
            email: req.user.email, 
            firstName: req.user.firstName, 
            isAdmin: req.user.isAdmin,
            cart : req.user.cart
        };
        return res.redirect('/products');
    }

    getFailRegister = async (_, res) => {   
        return res
        .status(400)
        .render('error', {code: 400, msg: "Failed to register the user"}) ;
    }

    postLogin = async (req, res) => {
        
        if (!req.user) {
            return res
                .status(400)
                .render('error', {code: 400, msg: "Invalid credentials"}) 
        } //no llega nunca a esta linea

        req.session.user = req.user;
        
        // { 
        //     _id: req.user._id, 
        //     email: req.user.email, 
        //     firstName: req.user.firstName, 
        //     isAdmin: req.user.isAdmin 
        // };

        return res.redirect('/products');
    }

    getFailLogin = async (req, res) => {
        return res
        .status(400)
        .render('error', {code: 400, msg: "Failed to login"}) ;
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

}

export const authController = new AuthController();