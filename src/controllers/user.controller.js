const user = require('../services/user.service');

const create = async (req, res, next) => {
  const token = await user.create(req.body);

  if (token.error) return next(token.error);

  res.status(201).json({ token });
};

module.exports = {
  create,
};
