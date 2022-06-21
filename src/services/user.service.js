const { User } = require('../database/models');
const generateToken = require('../utils/jwt');

const userAlreadyExists = { error: { statusCode: 409, message: 'User already registered' } };
const userDoesntExists = { error: { statusCode: 404, message: 'User does not exist' } };

const create = async ({ displayName, email, password, image }) => {
  const userRegistered = await User.findOne({ where: { email } });

  if (userRegistered) {
    return userAlreadyExists;
  }

  await User.create({ displayName, email, password, image });

  const token = generateToken(email);

  return token;
};

const getAll = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
    // attributes: ['displayName', 'email', 'image'],
  });

  return allUsers;
};

const findById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) return userDoesntExists;

  return user;
};

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } }, {
    attributes: { exclude: ['password'] },
  });

  if (!user) return userDoesntExists;

  return user;
};

module.exports = {
  create,
  getAll,
  findById,
  findByEmail,
};