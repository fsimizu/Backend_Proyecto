import fetch from 'node-fetch';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import jwt from 'passport-jwt';
import local from 'passport-local';
import { cartService } from '../services/carts.service.js';
import { userService } from '../services/users.service.js';
import { logger } from '../utils/logger.js';
import { createHash, isValidPassword } from '../utils/passEncryption.js';
import env from './environment.config.js';

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const LocalStrategy = local.Strategy;

function cookieExtractor(req) {
    let token = null;
    if (req?.cookies?.token) {
        token = req.cookies.token;
    }
    return token;
}

export function iniPassport() {

    passport.use(
        'login',
        new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await userService.getUserByEmail(username);
                logger.debug(user);
                if (!user) {
                    logger.warn('User Not Found with email ' + username);
                    return done(null, false);
                }
                if (!isValidPassword(password, user.password)) {
                    logger.warn('Invalid Password');
                    return done(null, false);
                }
                delete user.password;
                return done(null, user);
            } catch (err) {
                logger.error(err);
                return done(err);
            }
        })
    );

    passport.use(
        'register',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
            },

            async (req, username, password, done) => {
                try {
                    const { email, firstName, lastName, age } = req.body;
                    let user = await userService.getUserByEmail(username);

                    if (user) {
                        logger.warn('User already exists')
                        return done(null, false);
                    }

                    let cart = await cartService.createCart();

                    const newUser = {
                        email,
                        firstName,
                        lastName,
                        age,
                        isAdmin: false,
                        role: "user",
                        password: createHash(password),
                        cart: cart._id.toString(),
                    };

                    let userCreated = await userService.createUsers(newUser);
                    logger.info('User Registration succesful');
                    logger.debug(userCreated)
                    return done(null, userCreated);
                } catch (e) {
                    logger.error(e)
                    return done(e);
                }
            }
        )
    );

    const port = env.port;

    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: 'Iv1.9a387c7c1e7858a0',
                clientSecret: env.githubSecret,
                // callbackURL: `http://localhost:${port}/api/sessions/githubcallback`,
                callbackURL: `/api/sessions/githubcallback`,
            },
            async (accesToken, _, profile, done) => {
                try {
                    const res = await fetch('https://api.github.com/user/emails', {
                        headers: {
                            Accept: 'application/vnd.github+json',
                            Authorization: 'Bearer ' + accesToken,
                            'X-Github-Api-Version': '2022-11-28',
                        },
                    });
                    const emails = await res.json();
                    const emailDetail = emails.find((email) => email.verified == true);
                    if (!emailDetail) {
                        return done(new Error('cannot get a valid email for this user'));
                    }
                    profile.email = emailDetail.email;
                    let user = await userService.getUserByEmail(profile.email);

                    if (!user) {
                        let cart = await cartService.createCart();

                        const newUser = {
                            email: profile.email,
                            firstName: profile._json.name || profile._json.login || 'noname',
                            lastName: 'nolast',
                            isAdmin: false,
                            role: "user",
                            password: 'nopass',
                            cart: cart._id.toString(),
                        };

                        let userCreated = await userService.createUsers(newUser);

                        logger.info('User Registration succesful');
                        await userService.updateLastConnection(userCreated._id);

                        return done(null, userCreated);
                    } else {
                        logger.info('User already exists');
                        await userService.updateLastConnection(user._id);
                        return done(null, user);
                    }
                } catch (e) {
                    logger.error('Error en auth github', e)
                    return done(e);
                }
            }
        )
    );

    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: 'coderSecret',
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload)
                } catch (error) {
                    return done(e)
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userService.getUserById(id);
        done(null, user);
    });
}