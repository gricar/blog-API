module.exports = (err, _req, res, _next) => {
  const { isJoi, statusCode, message } = err;

  if (isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  return res
    .status(statusCode || 500)
    .json({ message } || { message: `Internal server error: ${message}` });
};