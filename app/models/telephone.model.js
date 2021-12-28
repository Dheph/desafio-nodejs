const mongoose = require('mongoose');

const Telephone = mongoose.model(
  'Telephone',
  mongoose.Schema({
    number: Number,
    area_code: Number,
    user_id: String,
  }),
);

module.exports = Telephone;
