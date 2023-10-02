export function isUser(req, res, next) {
    if (req.session.user) {
        return next();
    }
    return res.status(401).render('error', { code: 401, msg: 'You need to be logged in to access this site.' })
}

export function isAdmin(req, res, next) {
    if (req.session.user?.isAdmin == true) {
        return next();
    }
    return res.status(401).render('error', { code: 401, msg: 'You need to be logged as an admin to access this site.' })
}

export function canViewProfile(req, res, next) {

    if (req.session.user?.isAdmin == true || req.params._id == req.session.user?._id) {
        return next();
    }
    return res.status(401).render('error', { code: 401, msg: "You don't have permissions to see this profile" })
}

export function canCreate(req, res, next) {
    if (req.session.user?.role === 'admin' || req.session.user?.role === 'premium') {
        return next();
    }
    return res.status(401).render('error', { code: 401, msg: 'You dont have permissions to create a product.' })
}

export function isOwnCart(req, res, next) {
    if (req.params.cid === req.session.user?.cart) {
        return next();
    }
    return res.status(401).render('error', { code: 401, msg: "You don't have permissions to see this cart" })
}

