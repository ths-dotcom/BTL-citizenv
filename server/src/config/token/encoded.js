require('dotenv').config();
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function encodedToken(userId) {
    return jwt.sign(
        {
            id: userId,
            iat: new Date().getTime(), 
            exp: new Date().setDate(new Date().getDate() + 1)
        },
        ACCESS_TOKEN_SECRET
    )
}

module.exports = encodedToken;