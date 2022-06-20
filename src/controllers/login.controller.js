const findByEmail = require('../services/login.service');

module.exports = async (req, res, next) => {
  const token = await findByEmail(req.body);

  if (token.error) return next(token.error);

  return res.status(200).json({ token });
};
