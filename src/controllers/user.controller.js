const user = require('../services/user.service');

const create = async (req, res, next) => {
  const token = await user.create(req.body);

  if (token.error) return next(token.error);

  return res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const allUsers = await user.getAll();

  return res.status(200).json(allUsers);
};

module.exports = {
  create,
  getAll,
};
