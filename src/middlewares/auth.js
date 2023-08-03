export function isUser ( req, res, next ) {
    if ( req.session.user?.isAdmin == false ) {
        return next();
    }
    return res.status(401).render('error', {code: 401, msg: 'You need to be logged in to access this site.'})
}

export function isAdmin ( req, res, next ) {
    if ( req.session.user?.isAdmin == true ) {
        return next();
    }
    return res.status(401).render('error', {code: 401, msg: 'You need to be logged as an admin to access this site.'})
}

export function isOwnCart ( req, res, next ) {
    if ( req.params.cid === req.session.user?.cart) {
        return next();
    }
    return res.status(401).render('error', {code: 401, msg: "You don't have permissions to see this cart"})
}