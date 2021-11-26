const User = require('../models/user');
const Linkage = require('../models/linkage');
const auth = require('./auth');
const mongoose = require('mongoose');

let publicAccessId = '';

User.findOne({ email: '*' })
  .then((puser) => {
    publicAccessId = puser._id;
    console.log(publicAccessId);
  })
  .catch((er) => console.log('PUBLIC ACCESS USER NOT PRESENT', er));

exports.getLinkage = (req, res) => {
  const l_id = req.params.l_id; // linkage id;
  console.log('-->', publicAccessId);
  const checkAccessWith = auth.getUserIdFromToken(req) || publicAccessId;
  this.checkIfShared(l_id, checkAccessWith)
    .then((doc) => {
      if (doc) {
        delete doc['sharedWith'];
        res.status(200).json(doc);
      } else {
        res.status(403).end('Unauthorized');
      }
    })
    .catch((err) => res.status(400).end(JSON.stringify(err)));
};

exports.getSubLinkages = (req, res) => {
  const l_id = req.params.l_id; // linkage id;
  const checkAccessWith = auth.getUserIdFromToken(req) || publicAccessId;
  this.checkIfShared(l_id, checkAccessWith, true)
    .then((docs) => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(403).end('Unauthorized');
      }
    })
    .catch((err) => res.status(400).end(JSON.stringify(err)));
};

exports.checkIfShared = (l_id, withWhom, getChildren = false) => {
  return new Promise((resolve, reject) => {
    Linkage.findById(l_id, (err, doc) => {
      if (err) reject(err);
      else if (!doc) {
        reject('Linkage Not Found');
      } else if (
        doc.sharedWith.includes(withWhom) ||
        doc.sharedWith.includes(publicAccessId) ||
        doc.owner == withWhom
      ) {
        if (getChildren) {
          Linkage.find({
            parent: doc._id,
            $or: [
              { owner: withWhom },
              { sharedWith: { $in: [withWhom, publicAccessId] } },
            ],
          })
            .then((docs) => resolve(docs))
            .catch((err) => reject(err));
        } else resolve(doc);
      } else resolve(null);
    });
  });
};

exports.getRootLinkages = (req, res, next) => {
  const user_id = auth.getUserIdFromToken(req);
  if (user_id) {
    Linkage.find({ owner: user_id, isRoot: true })
      .then((doc) => res.status(200).json(doc))
      .catch((err) => next(err));
  } else res.status(403).end('Unauthorized');
};

exports.getLinkagePath = async (req, res) => {
  let l_id = req.query.l_id;
  const checkAccessWith = auth.getUserIdFromToken(req) || publicAccessId;
  let owner = false;
  if (!l_id) {
    owner = true;
  }
  const path = [];
  while (l_id) {
    try {
      const linkage = await Linkage.findById(l_id);
      if (linkage.owner == checkAccessWith) owner = true;
      if (
        linkage.owner == checkAccessWith ||
        linkage.sharedWith.includes(checkAccessWith) ||
        linkage.sharedWith.includes(publicAccessId)
      ) {
        let info = {};
        info._id = linkage._id;
        info.name = linkage.name;
        l_id = linkage.parent;
        path.push(info);
      } else break;
    } catch (err) {
      res.status(500).end(err.message);
    }
  }
  path.reverse();
  res.status(200).json({ owner, path });
};

exports.addNewLinkage = async (req, res, next) => {
  const category = req.body.category;
  const parent = req.body.parent;

  if (category === undefined) {
    res.status(404).end('Insufficient or inconsistent data');
  } else {
    req.body.owner = auth.getUserIdFromToken(req);
    req.body.isRoot = parent === undefined;
    try {
      if (parent) {
        let parentLinkage = await Linkage.findById(parent);
        const linkage = new Linkage(req.body);
        linkage.sharedWith = [...parentLinkage.sharedWith];
        const doc = await Linkage.create(linkage);
        res.status(200).json(doc);
      }
    } catch (err) {
      next(err);
    }
  }
};

exports.editLinkage = (req, res, next) => {
  if (req.body.owner || req.body.sharedWith || req.body.parent) {
    res.status(403).end('Invalid operation');
  } else {
    const l_id = req.params.l_id;
    Linkage.findByIdAndUpdate(l_id, { $set: req.body }, { new: true })
      .then((linkage) => res.status(200).json(linkage))
      .catch((err) => res.status(500).end({ success: false }));
  }
};

exports.deleteLinkage = (req, res, next) => {
  const l_id = mongoose.Types.ObjectId(req.params.l_id);
  getAllDescendants(l_id, true).then((docIds) => {
    Linkage.deleteMany({ _id: { $in: docIds } })
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(500).end(err));
  });
  // Linkage.findByIdAndRemove(l_id)
  //   .then((resp) => res.status(200).json({ success: true }))
  //   .catch((err) => res.status(500).json({ success: false }));
};

exports.getSharingDetails = (req, res, next) => {
  const l_id = req.params.l_id;
  Linkage.findById(l_id, 'sharedWith')
    .populate('sharedWith')
    .then((details) => res.status(200).json(details))
    .catch((err) => next(err));
};

exports.editSharingDetails = (req, res, next) => {
  const l_id = mongoose.Types.ObjectId(req.params.l_id);
  const op = req.query.operation;
  const email = req.body.email;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      getAllDescendants(l_id, true)
        .then((docIds) => {
          console.log('docids ->', docIds);
          if (op === 'add') {
            Linkage.updateMany(
              { _id: { $in: docIds } },
              { $addToSet: { sharedWith: user._id } }
            )
              .then((resp) => res.status(200).json(user))
              .catch((err) => next(err));
          } else if (op === 'remove') {
            Linkage.updateMany(
              { _id: { $in: docIds } },
              { $pull: { sharedWith: user._id } }
            )
              .then((resp) => res.status(200).json(user))
              .catch((err) => next(err));
          } else {
            res.status(403).end('Invalid operation');
          }
        })
        .catch((err) => next(err));
    } else res.status(404).end(`User with email ${email} does not exist`);
  });
};

exports.moveLinkage = (req, res, next) => {
  const l_id = req.params.l_id;
  const to_id = req.body.toId;
  if (to_id === '/') {
    Linkage.findByIdAndUpdate(l_id, {
      $set: { isRoot: true },
    })
      .then((resp) => res.status(200).json({ success: true }))
      .catch((err) => next(err));
  } else {
    Linkage.find({ _id: { $in: [l_id, to_id] } })
      .then((docs) => {
        if (docs.length !== 2) {
          res
            .status(404)
            .end('Either current or future or both linkages not found');
        } else {
          Linkage.findByIdAndUpdate(l_id, {
            $set: { parent: to_id, isRoot: false },
          })
            .then((resp) => res.status(200).json({ success: true }))
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  }
};

const getAllDescendants = async (parentId, includeParent = false) => {
  let children = [];
  if (includeParent) children.push(parentId);
  let queue = [parentId];
  while (queue.length > 0) {
    let cpid = queue.shift(); //current parent id
    try {
      let docs = await getChildrenWithParent(cpid);
      if (docs) {
        let ids = docs.map((doc) => doc._id);
        children.push(...ids);
        queue.push(...ids);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  return Promise.resolve(children);
};

const getChildrenWithParent = async (parentId) => {
  return Linkage.find({ parent: parentId }, '_id');
};
