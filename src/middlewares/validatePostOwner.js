const { findByEmail } = require('../services/user.service');
const { getById } = require('../services/blogPosts.service');

const unauthorizedUser = { error: { statusCode: 401, message: 'Unauthorized user' } };

module.exports = async (req, _res, next) => {
  const postExist = await getById(req.params.id);
  
  if (postExist.error) return next(postExist.error);
  
  const { id: userId } = await findByEmail(req.user.userEmail);

  // check if is the editor user is who create the post 
  if (postExist.userId !== userId) return next(unauthorizedUser.error);

  next();
};
