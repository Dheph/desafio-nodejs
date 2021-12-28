const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created_at: { type: Date, required: true, default: Date.now() },
    modified_at: { type: Date, required: true, default: Date.now() },
  }),
);

module.exports = User;
