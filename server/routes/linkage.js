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

linkageRouter
  .route('/:l_id')
  .get(universalCtrl.validateObjectId, linkageCtrl.getLinkage)
  .put(
    auth.verifyUser,
    auth.verifyOwner,
    universalCtrl.validateObjectId,
    linkageCtrl.editLinkage
  )
  .delete(
    auth.verifyUser,
    auth.verifyOwner,
    universalCtrl.validateObjectId,
    linkageCtrl.deleteLinkage
  )
  .post(universalCtrl.requestNotAccepted);

linkageRouter
  .route('/:l_id/subLinkages')
  .get(universalCtrl.validateObjectId, linkageCtrl.getSubLinkages)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted)
  .post(universalCtrl.requestNotAccepted);

linkageRouter
  .route('/:l_id/share')
  .get(
    auth.verifyUser,
    auth.verifyOwner,
    universalCtrl.validateObjectId,
    linkageCtrl.getSharingDetails
  )
  .put(
    auth.verifyUser,
    auth.verifyOwner,
    universalCtrl.validateObjectId,
    linkageCtrl.editSharingDetails
  )
  .post(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

linkageRouter
  .route('/:l_id/move')
  .post(
    auth.verifyUser,
    auth.verifyOwner,
    universalCtrl.validateObjectId,
    linkageCtrl.moveLinkage
  )
  .get(universalCtrl.requestNotAccepted)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

module.exports = linkageRouter;
