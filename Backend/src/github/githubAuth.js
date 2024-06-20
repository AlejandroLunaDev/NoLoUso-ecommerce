// src/github/githubAuth.js
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import AuthUserDao from '../auth/dao/authUserDao.js';
import dotenv from 'dotenv';
dotenv.config();
import { generateAccessToken, generateRefreshToken } from '../auth/utils/jwt.js';

const callbackURL = process.env.NODE_ENV === 'production'
  ? process.env.GITHUB_CALLBACK_URL_PROD
  : process.env.GITHUB_CALLBACK_URL_DEV;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: callbackURL,
    scope: ['user:email'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let existingUser = null;
        
        // Verificar si el perfil proporciona un correo electrónico
        if (profile.emails && profile.emails.length > 0) {
            existingUser = await AuthUserDao.getUserByEmail(profile.emails[0].value);
        }

        if (existingUser) {
            const accessToken = generateAccessToken(existingUser);
            const refreshToken = generateRefreshToken(existingUser);
            return done(null, existingUser, { accessToken, refreshToken });
        }
        
        // Crear un nuevo usuario si no existe
        const password = process.env.GITHUB_PLACEHOLDER_PASSWORD /* || Math.random().toString(36).slice(-8) */;
        const newUser = await AuthUserDao.createUser({
            first_name: profile._json.name ? profile._json.name.split(' ')[0] : 'GitHub User',
            last_name: profile._json.name ? profile._json.name.split(' ')[1] : 'User',
            email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : 'githubuser@example.com',
            password: password,
            role: 'user', 
            avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : 'https://via.placeholder.com/150', 
            last_connection: null, 
            online: false,
            cart: null, 
            conversations: [],
        });

        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);
        return done(null, newUser, { accessToken, refreshToken });
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await AuthUserDao.getUserById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
