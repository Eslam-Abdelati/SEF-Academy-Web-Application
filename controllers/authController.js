const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateUserId = require("../utils/userIdGenerator");
const { User, hashPassword } = require("../models/User");

const {
  validateRegisterUser,
  validateLoginUser,
} = require("../validation/userValidator");

/**
 *  @desc    Register New User
 *  @route   /api/auth/register
 *  @method  POST
 *  @access  public
 */
module.exports.register = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "this email already registered",
    });
  }

  req.body.password = await hashPassword(req.body.password);
  const userId = await generateUserId();

  user = new User({ userId, ...req.body });

  const result = await user.save();
  const token = user.generateToken();

  const { password, ...other } = result._doc;

  res.status(201).json({
    success: true,
    data: { ...other, token },
  });
});

/**
 *  @desc    Login User
 *  @route   /api/auth/login
 *  @method  POST
 *  @access  public
 */
module.exports.login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  let user = await User.findOne({ userId: req.body.userId });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "invalid id or password",
    });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({
      success: false,
      message: "invalid id or password",
    });
  }
  const token = user.generateToken();

  const { password, ...other } = user._doc;

  res.status(200).json({
    success: true,
    data: { ...other, token },
  });
});
