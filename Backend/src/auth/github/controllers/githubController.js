import passport from '../githubAuth.js';
import dotenv from 'dotenv';

dotenv.config();

export const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

export const githubCallback = (req, res, next) => {
    passport.authenticate('github', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la autenticación de GitHub' });
        }
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const { accessToken, refreshToken } = info;

        let cookieOptions = {};

        if (process.env.NODE_ENV === 'production') {
            // Opciones de cookie para producción
            cookieOptions = { sameSite: 'None', secure: true, domain: '.railway.app'};
            
        }

        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);

        // Determinar la URL de redirección en función del entorno
        const redirectURL = process.env.NODE_ENV === 'production'
            ? 'https://no-lo-uso-ecommerce.vercel.app/'
            : 'http://localhost:5173/';

        // Redirige al cliente sin los tokens en la URL
        res.redirect(redirectURL);
    })(req, res, next);
};

export const githubRedirect = (req, res) => {
    let cookieOptions = {};

    if (process.env.NODE_ENV === 'production') {
        // Opciones de cookie para producción
        console.log()
        cookieOptions = { sameSite: 'None', secure: true, domain: '.railway.app' };
    }

    // Determinar la URL de redirección en función del entorno
    const redirectURL = process.env.NODE_ENV === 'production'
        ? 'https://nolouso-ecommerce-production.up.railway.app/'
        : 'http://localhost:5173/';

    // Establecer las cookies antes de redirigir
    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    // Redirige a la página principal o donde prefieras
    res.redirect(redirectURL);
};

