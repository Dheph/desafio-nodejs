const mongoose = require('mongoose');

const Telephone = mongoose.model(
  'Telephone',
  mongoose.Schema({
    number: Number,
    area_code: Number,
  }),
);

module.exports = Telephone;
