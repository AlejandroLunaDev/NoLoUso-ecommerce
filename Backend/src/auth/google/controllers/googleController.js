// src/controllers/googleController.js
import passport from '../googleAuth.js';

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

export const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Error en la autenticación de Google' });
    }
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { accessToken, refreshToken } = info;

    let cookieOptions = {};

    if (process.env.NODE_ENV === 'production') {
      cookieOptions = {
        sameSite: 'None',
        secure: true,
        domain: '.silouso.shop'
      };
    }

    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    const redirectURL =
      process.env.NODE_ENV === 'production'
        ? 'https://silouso.shop/'
        : 'http://localhost:5173/';

    res.redirect(redirectURL);
  })(req, res, next);
};

export const googleRedirect = (req, res) => {
  const { accessToken, refreshToken } = req.cookies; // Obtener los tokens de las cookies

  let cookieOptions = {};

  if (process.env.NODE_ENV === 'production') {
    cookieOptions = {
        sameSite: 'None',
        secure: true,
        domain: '.silouso.shop'
      };
  }

  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);

  const redirectURL =
    process.env.NODE_ENV === 'production'
      ? 'https://silouso.shop/'
      : 'http://localhost:5173/';

  res.redirect(redirectURL);
};
