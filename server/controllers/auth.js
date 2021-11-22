const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Linkage = require('../models/linkage');
const sendError = require('./errorControl');
const { OAuth2Client } = require('google-auth-library');

const GC_ID = process.env.GOOGLE_CLIENT_ID;
const jwtSecret = process.env.JWT_SECRET;
const client = new OAuth2Client(GC_ID);

exports.googleLogin = (req, res) => {
  const { gtoken } = req.body;
  client
    .verifyIdToken({ idToken: gtoken, audience: GC_ID })
    .then((response) => {
      const { email_verified, email, name } = response.payload;
      if (email_verified) {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            sendError(400, 'Something Went Wrong finding details in DB...')(
              req,
              res
            );
          } else if (user) {
            console.log('Exists');
            const { _id, name, email } = user;
            res.status(200).json({
              auth_token: generateToken(user),
              user: { _id, name, email },
            });
          } else {
            console.log('New');
            let newUser = new User({ email, name });
            newUser
              .save()
              .then((user) => {
                res.status(200).json({
                  auth_token: generateToken(user),
                  user: user,
                });
              })
              .catch((err) =>
                res.status(400).json({
                  error: 'Something Went Wrong creating user in DB...',
                })
              );
          }
        });
      }
    });
};

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

// if token is valid, return user details
exports.refreshUser = (req, res, next) => {
  try {
    var user_id = verifyToken(req.headers);
    User.findById(user_id, (err, user) => {
      if (err) next(err);
      else {
        res.status(200).json(user);
      }
    });
  } catch (err) {
    sendError(403, 'Token expired! Login Again')(req, res);
  }
};

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
    } else sendError(406, 'User not found')(req, res);
  });
};
