const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (userEmail) => jwt.sign({ userEmail }, JWT_SECRET, jwtConfig);

module.exports = generateToken;