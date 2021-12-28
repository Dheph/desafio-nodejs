const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    telephones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Telephone',
      },
    ],
    created_at: { type: String, required: true, default: Date.now() },
    modified_at: { type: String, required: true, default: Date.now() },
  }),
);

module.exports = User;
