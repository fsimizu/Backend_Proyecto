import fetch from 'node-fetch';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import { UserModel } from "../dao/models/users.model.js";
import { createHash, isValidPassword } from '../utils/passEncryption.js';
import { GITHUB_SECRET } from "./env.js";
const LocalStrategy = local.Strategy;
// import LocalStrategy from 'passport-local' 

export function iniPassport() {

    passport.use(
        'login',
        new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username });
                if (!user) {
                    console.log('User Not Found with email ' + username);
                    return done(null, false);
                }
                if (!isValidPassword(password, user.password)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }
                return done(null, user);
            } catch (err) {
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
                    // const { registerName: firstName, registerLastName: lastName, registerEmail: email } = req.body;
                    const { email, firstName, lastName } = req.body;
                    let user = await UserModel.findOne({ email: username });
                    // console.log(user);
                    
                    if (user) {
                        console.log('User already exists');
                        return done(null, user);
                    }

                    const newUser = {
                        email,
                        firstName,
                        lastName,
                        isAdmin: false,
                        password: createHash(password),
                    };
                    let userCreated = await UserModel.create(newUser);
                    console.log(userCreated);
                    console.log('User Registration succesful');
                    return done(null, userCreated);
                } catch (e) {
                    console.log('Error in register');
                    console.log(e);
                    return done(e);
                }
            }
        )
    );

    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: 'Iv1.9a387c7c1e7858a0',
                clientSecret: GITHUB_SECRET,
                callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
            },
            async (accesToken, _, profile, done) => {
                console.log(profile);
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
                    let user = await UserModel.findOne({ email: profile.email });
                    if (!user) {
                        const newUser = {
                            email: profile.email,
                            firstName: profile._json.name || profile._json.login || 'noname',
                            lastName: 'nolast',
                            isAdmin: false,
                            role: "user",
                            pass: 'nopass',
                        };
                        let userCreated = await UserModel.create(newUser);
                        console.log('User Registration succesful');
                        return done(null, userCreated);
                    } else {
                        console.log('User already exists');
                        return done(null, user);
                    }
                } catch (e) {
                    console.log('Error en auth github');
                    console.log(e);
                    return done(e);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id);
        done(null, user);
    });
}