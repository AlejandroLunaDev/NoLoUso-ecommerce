import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.log('No token provided');
        return res.sendStatus(401);
    }

    const isRefreshToken = req.path === '/api/auth/refresh-token' || req.path === '/api/auth/logout';
    const secret = !isRefreshToken ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET;
    
    console.log(process.env.ACCESS_TOKEN_SECRET);
   
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        console.log("el id es", user.user._id);
        next();
    });
}

export default authenticateToken;
