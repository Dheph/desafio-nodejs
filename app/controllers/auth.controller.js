const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Telephone = db.telephone;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

exports.signup = async (req, res) => {
  const { name, email, password, telephones } = req.body;
  if (validateEmail(email) === false) {
    return res.status(400).json({
      message: `O email ${email}, é inválido, por favor tente novamente`,
    });
  }
  telephones.map((phone) => {
    if (!phone.number.length === 9) {
      return res.status(400).json({
        message: `O número: ${phone.number} é inválido, por favor tente novamente`,
      });
    }
    if (!phone.area_code.length === 2) {
      return res.status(400).json({
        message: `O código de area ${phone.area_code} informado é inválido por favor tente novamente`,
      });
    }
  });

  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  await user.save(async (err, user) => {
    if (err) {
      res.status(500).json({
        message:
          'Ocorreu um erro durante o registro do usuário, por favor tente novamente!',
      });
      return;
    }

    await user.save((err, doc) => {
      if (err) {
        res.status(500).json({
          message:
            'Ocorreu um erro durante o registro geral do usuário, por favor tente novamente',
        });
        return;
      }

      if (telephones) {
        telephones.map(async (phone) => {
          const telephone = new Telephone({
            number: phone.number,
            area_code: phone.area_code,
            user_id: doc._id,
          });

          await telephone.save();

          res
            .status(200)
            .json({
              id: doc._id,
              created_at: doc.created_at,
              modified_at: doc.modified_at,
            });
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  if (validateEmail(email) === false) {
    return res.status(400).json({
      message: `O email ${email}, é inválido, por favor tente novamente`,
    });
  }

  User.findOne({
    email,
  }).exec((err, user) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Ocorreu um erro durante a checagem do usuário' });
      return;
    }
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ accessToken: null, message: 'Senha Inválida!!' });
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
