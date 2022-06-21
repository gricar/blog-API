const Joi = require('joi');

const loginInfo = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
  });

const validateNewPost = async (req, _res, next) => {
  const { error } = loginInfo.validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = validateNewPost;
