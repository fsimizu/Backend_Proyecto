class ViewsController {
    getHome = (_, res) => {
        return res.status(201).render('home');
    };
    getRegister = (_, res) => {
        return res.status(201).render('register');
    };
    getProfile = (_, res) => {
        return res.status(201).render('profile');
    };
    getAdmin = (_, res) => {
        return res.status(201).render('admin');
    };
    getLogout = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.render('error', { code: 500, msg: 'Error closing the session' });
            }
            res.redirect('/');
        });
    }
    getJwt = (_, res) => {
        return res.render('jwt-login');
    }
    getRecovery = (_, res) => {
        return res.status(201).render('pass-recovery');
    };
    
    getChange = (req, res) => {
        const { code, email } = req.params;
        return res.status(201).render('pass-change');
    };
    

}

export const viewsController = new ViewsController();