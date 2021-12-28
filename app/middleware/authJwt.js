const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

verifyToken = (req, res, next) => {
  let bearerHeader = req.headers['authorization'];
  JSON.stringify(bearerHeader);
  let bearer = bearerHeader.split(' ');
  let token = bearer[1];

  if (!token) {
    return res.status(401).json({ message: 'Erro!, token não informado!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Não Autorizado!' });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = { verifyToken };

module.exports = authJwt;
