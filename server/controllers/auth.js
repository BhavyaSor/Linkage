const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Linkage = require('../models/linkage');
const sendError = require('./errorControl');

const jwtSecret = process.env.JWT_SECRET;

function generateToken(user) {
  var token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '1h' });
  return token;
}

function getBearerTokenFromHeaders(headers) {
  if (headers && headers?.authorization) {
    var header = headers?.authorization.split(' ');
    if (header[0] === 'Bearer') return header[1];
  }
  return new Error('No Bearer Token in authorization header');
}

function verifyToken(headers) {
  try {
    var token = getBearerTokenFromHeaders(headers);
    var user_id = jwt.verify(token, jwtSecret);
    return user_id;
  } catch (err) {
    throw err;
  }
}

exports.verifyUser = (req, res, next) => {
  try {
    var user_id = verifyToken(req.headers);
    User.findById(user_id, (err, user) => {
      if (err) next(err);
      else {
        next();
        req.body.user_id = user_id;
      }
    });
  } catch (err) {
    sendError(403, 'Unauthorized')(req, res);
  }
};

exports.getUserIdFromToken = (req) => {
  try {
    var user = verifyToken(req.headers);
    return user._id;
  } catch (err) {
    return null;
  }
};

// verifies owner of linkage document
exports.verifyOwner = (req, res, next) => {
  var user_id = this.getUserIdFromToken(req);
  if (user_id) {
    Linkage.findById(req.params.l_id)
      .then((linkage) => {
        if (linkage.owner == user_id) next();
        else sendError(403, 'Unauthorized')(req, res);
      })
      .catch((err) => next(err));
  } else sendError(403, 'Unauthorized')(req, res);
};

// only for testing purpose
// remove in prod
exports.getTestToken = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.status(500).end(err.message);
    else if (user) {
      res.json({
        user,
        auth_token: generateToken(user),
      });
    } else res.status(406).end('User Not Found');
  });
};
