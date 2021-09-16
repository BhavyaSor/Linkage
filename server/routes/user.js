const userRouter = require('express').Router();
const auth = require('../controllers/auth');

userRouter.route('/getTestToken').post(auth.getTestToken);


module.exports = userRouter;
