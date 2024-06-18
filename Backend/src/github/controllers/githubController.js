// src/github/controllers/githubController.js
import passport from '../githubAuth.js';

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
        
        // Enviar los tokens al cliente
        res.json({
            message: 'Autenticación exitosa',
            accessToken,
            refreshToken
        });
    })(req, res, next);
};

export const githubRedirect = (req, res) => {
    res.redirect('http://localhost:5173/'); // Redirige a la página principal o donde prefieras
};
