const Joi = require('joi');

module.exports = async (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    }).validate(req.body);

  if (error) return next(error);

  next();
};