const { isValidObjectId } = require('mongoose');

exports.requestNotAccepted = (req, res) => {
  res.status(403).end(`/${req.method} not supported on ${req.originalUrl}`);
};

exports.validateObjectId = (req, res, next) => {
  if (isValidObjectId(req.params.l_id)) next();
  else res.status(406).end(`${req.params.l_id} is not a valid Object ID`);
};

exports.validateObjectIdByQueryParams = (req, res, next) => {
  const l_id = req.query.l_id;
  if (!l_id) next();
  if (isValidObjectId(l_id)) next();
  else res.status(406).end(`${req.params.l_id} is not a valid Object ID`);
};
