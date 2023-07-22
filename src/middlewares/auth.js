export function isUser ( req, res, next ) {
    if ( req.session?.user ) {
        // console.log(req.session.user.email)
        return next();
    }
    return res.status(401).render('error', {code: 401, msg: 'You need to be logged in to access this site.'})
}

export function isAdmin ( req, res, next ) {
    if ( req.session?.user && req.session?.user?.role === 'admin' ) {
        return next();
    }
    return res.status(401).render('error', {code: 401, msg: 'You need to be logged as an admin to access this site.'})
}