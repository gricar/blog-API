const Joi = require('joi');

module.exports = async (req, _res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
    }).validate(req.body);

  if (error) return next(error);

  next();
};
