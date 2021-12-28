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
    created_at: Date,
    modified_at: Date,
  }),
);

module.exports = User;
