const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  secret: process.env.USER_JWT_SECRET_KEY,
};
