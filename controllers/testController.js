const User = require("../models/User");

const getTestMessage = (req, res) => {
  const user = new User({ email: "ibrahim", password: 123 });

  user.save().then(async () => {
    await User.find({}, "email").then((users) => {
      res.json(users);
    });
  });
};

module.exports = {
  getTestMessage,
};
