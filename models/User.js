const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phoneNumber: { type: String },

    age: { type: Number },
    graduationYear: { type: Number },
    about: { type: String },
    nationality: { type: String },
    country: { type: String },
    city: { type: String },
    university: { type: String },
    major: { type: String },
    isActive: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["admin", "instructor", "student", "editor"],
      default: "student",
    },

    // profileImage TODO later

    profileImage: {
      type: String,
      default: "",
    },
    
  },
  { versionKey: false }
);

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY
  );
};

const User = mongoose.model("User", userSchema);

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = { User, hashPassword };
