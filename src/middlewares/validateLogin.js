const Joi = require('joi');

const loginInfo = Joi.object({
  email: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
  }).messages({
    'string.empty': 'Some required fields are missing!',
  });

const validateLogin = async (req, _res, next) => {
  const { error } = loginInfo.validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = validateLogin;
