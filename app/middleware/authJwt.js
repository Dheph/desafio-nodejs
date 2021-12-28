const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.send({ message: 'Erro!, token não informado!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Não Autorizado!' });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = { verifyToken };

module.exports = authJwt;
