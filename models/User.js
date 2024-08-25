const mongoose = require("mongoose");

const User = mongoose.model("user", {
  email: {
    type: String,
  },

  password: {
    type: String,
  },
});

module.exports = User;
