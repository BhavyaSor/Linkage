const mongoose = require('mongoose');

const linkageSchema = mongoose.Schema(
  {
    category: {
      type: Number,
      // 1 = category
      // 2 = Link itself
      // 3 = notes
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: 'Linkage',
    },
    sharedWith: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
      },
    ],
    objData: String,
    name: {
      type: String,
      required: true,
    },
    color: String,
    isRoot: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Linkage', linkageSchema);
