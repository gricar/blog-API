const { User } = require('../database/models');
const generateToken = require('../utils/jwt');

const userAlreadyExists = { error: { statusCode: 409, message: 'User already registered' } };

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

module.exports = {
  create,
  getAll,
};