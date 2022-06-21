const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const tokenNotFound = { error: { statusCode: 401, message: 'Token not found' } };
const tokenInvalid = { error: { statusCode: 401, message: 'Expired or invalid token' } };

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(tokenNotFound.error);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = decoded;

    return next();
  } catch (err) {
    return next(tokenInvalid.error);
  }
};
