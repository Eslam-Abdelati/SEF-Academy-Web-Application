const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const currentYear = new Date().getFullYear();
const minYear = currentYear - 60;

const messages = {
  firstName: {
    "string.min": 'First name must be at least 3 characters',
    "string.max": 'First name must be less than or equal to 50 characters',
    "any.required": 'First name is required',
  },
  lastName: {
    "string.min": 'Last name must be at least 3 characters',
    "string.max": 'Last name must be less than or equal to 50 characters',
    "any.required": 'Last name is required',
  },
  graduationYear: {
    'number.base': 'Graduate year must be a number.',
    'number.min': `Graduate year cannot be earlier than ${minYear}.`,
    'number.max': `Graduate year cannot exceed the current year (${currentYear}).`,
  },
  phoneNumber: {
    'string.pattern.base': 'Phone number must include a valid country code followed by 10 digits.',
  }
}

// Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .required(),

    lastName: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .required(),

    email: Joi.string().trim().min(5).max(100).email().required(),

    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    userId: Joi.string().trim().min(10).max(10).required(),

    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(50).pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .optional().messages(messages.firstName),

    lastName: Joi.string().trim().min(3).max(50).pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .optional().messages(messages.lastName),

    about: Joi.string().trim().min(3).max(500).optional(),
    age: Joi.number().integer().min(15).max(80).optional(),
    nationality: Joi.string().trim().min(3).max(50).optional(),
    country: Joi.string().trim().min(3).max(50).optional(),
    city: Joi.string().trim().min(3).max(50).optional(),
    major: Joi.string().trim().min(3).max(50).optional(),

    graduationYear: Joi.number().integer().min(minYear).max(currentYear)
      .optional().messages(messages.currentYear),

    email: Joi.string().trim().min(5).max(100).email().optional(),

    phoneNumber: Joi.string().pattern(/^\+?[0-9]{1,3}[ ]?[0-9]{10}$/)
      .optional().messages(messages.phoneNumber),

    profileImage: Joi.string().optional(),
  });
  return schema.validate(obj);
}


module.exports = {
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
