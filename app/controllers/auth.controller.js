const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Telephone = db.telephone;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const { name, email, password, telephones } = req.body;
  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message:
          'Ocorreu um erro durante o registro do usuário, por favor tente novamente!',
      });
      return;
    }
    if (telephones) {
      Telephone.find(
        {
          number: { $in: telephones },
        },
        (err, telephonesResponse) => {
          if (err) {
            res.status(500).send({
              message:
                'Ocorreu um erro durante a verificação dos telefones, por favor tente novamente!',
            });
            return;
          }
          user.telephones = telephonesResponse.map(
            (telephone) => telephone._id,
          );
          user.save((err) => {
            if (err) {
              res.status(500).send({
                message:
                  'Ocorreu um erro durante o registro geral do usuário, por favor tente novamente',
              });
              return;
            }
            res.status(200).send({ message: 'Usuário criado com sucesso!' });
          });
        },
      );
    } else {
      Telephone.findOne({ name: 'user' }, (err, telephoneResponse) => {
        if (err) {
          res.status(500).send({
            message: 'Ocorreu um erro durante a validação do telefone',
          });
          return;
        }

        user.telephones = [telephoneResponse._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({
              message: 'Ocorreu um erro durante o registro do usuário',
            });
            return;
          }
          res.status(200).send({ message: 'Usuário criado com sucesso!' });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email,
  })
    .populate('telephones', '-__v')
    .exec((err, user) => {
      if (err) {
        res
          .status(500)
          .send({ message: 'Ocorreu um erro durante a checagem do usuário' });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: 'Senha Inválida!!' });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, //24 hours
      });

      res.status(200).json({
        id: user._id,
        email: user.email,
        accessToken: token,
      });
    });
};
