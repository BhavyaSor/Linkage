const sendError = (statusCode, message) => (req, res) => {
  res.status(statusCode).end(message);
};

module.exports = sendError;
