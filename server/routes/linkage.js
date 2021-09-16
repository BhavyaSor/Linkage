const linkageCtrl = require('../controllers/linkageCntrl');
const auth = require('../controllers/auth');
const universalCtrl = require('../controllers/universal');
const linkageRouter = require('express').Router();

linkageRouter
  .route('/')
  .get(auth.verifyUser, linkageCtrl.getRootLinkages)
  .post(auth.verifyUser, linkageCtrl.addNewLinkage)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

linkageRouter
  .route('/path')
  .get(linkageCtrl.getLinkagePath)
  .post(universalCtrl.requestNotAccepted)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

module.exports = linkageRouter;
