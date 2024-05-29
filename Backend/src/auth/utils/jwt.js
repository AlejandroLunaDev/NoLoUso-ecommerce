import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

function sing(payload,isAccesToken) {
    return jwt.sign(payload,isAccesToken ? process.env.ACCESS_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: isAccesToken ? "3000" : "10d",
    });
}

function generateAccessToken(user) {
    return sing({user}, true);
}

function generateRefreshToken(user) {
    return sing({user}, false);
}

export { generateAccessToken, generateRefreshToken }