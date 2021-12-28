const db = require('../models');
const Telephone = db.telephone;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({
        message:
          'Ocorreu um erro durante a verificação do usuário, por favor tente novamente!',
      });
      return;
    }
    if (user) {
      res
        .status(400)
        .json({ message: 'Erro!, O email informado já está em uso' });
      return;
    }
    next();
  });
};

checkTelephonesExisted = (req, res, next) => {
  const { telephones } = req.body;

  if (telephones) {
    for (let i = 0; i < telephones.length; i++) {
      Telephone.findOne({
        number: telephones[i].number,
      }).exec((err, telephone) => {
        if (err) {
          res.status(500).json({
            message:
              'Ocorreu um erro durante a validação do(s) telefones, por favor tente novamente!',
          });
          return;
        }
        if (telephone) {
          res
            .status(400)
            .json(`Erro!, O telefone: ${telephones[i].number}, já está em uso`);
        }
      });
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateEmail,
  checkTelephonesExisted,
};

module.exports = verifySignUp;
