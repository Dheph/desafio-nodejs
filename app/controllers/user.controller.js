const db = require('../models');
const User = db.user;
const Telephone = db.telephone;

exports.userInfo = async (req, res) => {
  const { userId } = req;

  const user = await User.findById(userId);

  const telephone = await Telephone.find({
    user_id: userId,
  });

  await res.status(200).json({
    id: user._id,
    email: user.email,
    telephones: telephone,
    created_at: user.created_at,
    modified_at: user.modified_at,
  });
};
