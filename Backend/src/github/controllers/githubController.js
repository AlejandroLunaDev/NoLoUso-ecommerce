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

        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);

        // Determinar la URL de redirección en función del entorno
        const redirectURL = process.env.NODE_ENV === 'production'
            ? 'https://no-lo-uso-ecommerce.vercel.app/'
            : 'http://localhost:5173/';

        // Redirige al cliente sin los tokens en la URL
        res.redirect(redirectURL);
    })(req, res, next);
};

export const githubRedirect = (req, res) => {
    // Determinar la URL de redirección en función del entorno
    const redirectURL = process.env.NODE_ENV === 'production'
        ? 'https://nolouso-ecommerce-production.up.railway.app/'
        : 'http://localhost:5173/';

    res.redirect(redirectURL); // Redirige a la página principal o donde prefieras
};
