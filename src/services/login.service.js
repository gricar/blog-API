const { User } = require('../database/models');
const generateToken = require('../utils/jwt');

const userNotFound = { error: { statusCode: 400, message: 'Invalid fields' } };
const wrongPassword = { error: { statusCode: 401, message: 'Wrong password' } };

const findByEmail = async ({ email, password }) => {
  const userRegistered = await User.findOne({ where: { email } });

  if (!userRegistered) {
    return userNotFound;
  }
  
  if (password === userRegistered.dataValues.password) {
    const token = generateToken(email);

    return token;
  }
  
  return wrongPassword;
};

module.exports = findByEmail;