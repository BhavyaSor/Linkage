const userRouter = require('express').Router();
const auth = require('../controllers/auth');
const universalCtrl = require('../controllers/universal');

userRouter.route('/getTestToken').post(auth.getTestToken);
userRouter
  .route('/refreshUser')
  .get(auth.refreshUser)
  .all(universalCtrl.requestNotAccepted);

module.exports = userRouter;
