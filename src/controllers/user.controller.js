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

const findById = async (req, res, next) => {
  const { id } = req.params;

  const userData = await user.findById(id);

  if (userData.error) return next(userData.error);

  return res.status(200).json(userData);
};

const remove = async (req, res) => {
  const { id } = await user.findByEmail(req.user.userEmail);

  await user.remove(id);

  return res.status(204).end();
};

module.exports = {
  create,
  getAll,
  findById,
  remove,
};
