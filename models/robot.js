const mongoose = require('mongoose');

const robotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ownerID: {
    type: String,
    required: true,
  },
  identifier: {
    type: String,
    required: true,
    unique: true,
  },
});

robotSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Robot', robotSchema);
