const Joi = require('joi');

const loginInfo = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
  });

const validatePostEdit = async (req, _res, next) => {
  const { error } = loginInfo.validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = validatePostEdit;
