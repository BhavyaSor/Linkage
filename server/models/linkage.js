const mongoose = require('mongoose');

const linkageSchema = mongoose.Schema(
  {
    category: {
      type: Number,
      // 0 = main category
      // 1 = subcategory
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
    name: String,
    color: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Linkage', linkageSchema);
