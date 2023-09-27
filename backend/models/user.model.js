import { Schema, model } from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 254,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 1024,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

// Hashing password using `pre save` hook
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

/**
 * Compare user provided password with saved hashed password
 * @function
 * @name comparePassword
 * @param {string} password - User Provided Password
 */
userSchema.methods.comparePassword = async function (password) {
  const isValidUser = await bcrypt.compare(password, this.password);

  return isValidUser;
};

export const userRegistrationSchema = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.max': `Name cannot be more than {#limit} characters long`,
    'any.required': 'Name is required',
  }),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(5)
    .max(255)
    .required()
    .messages({
      'email.base': 'Email must be a string',
      'email.empty': 'Email cannot be empty',
      'email.email': 'Invalid email',
      'email.min': `Email must be at least {#limit} characters long`,
      'email.max': `Email cannot be more than {#limit} characters long`,
      'any.required': 'Email is required',
    }),
  password: Joi.string().trim().min(8).max(30).required().messages({
    'password.base': 'Password must be a string',
    'password.empty': 'Password cannot be empty',
    'password.min': `Password must be at least {#limit} characters long`,
    'password.max': `Password cannot be more than {#limit} characters long`,
    'any.required': 'Password is required',
  }),
});

export const userAuthenticationSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(5)
    .max(255)
    .required()
    .messages({
      'email.base': 'Email must be a string',
      'email.empty': 'Email cannot be empty',
      'email.email': 'Invalid email',
      'email.min': `Email must be at least {#limit} characters long`,
      'email.max': `Email cannot be more than {#limit} characters long`,
      'any.required': 'Email is required',
    }),
  password: Joi.string().trim().required(),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().trim().max(100).messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.max': `Name cannot be more than {#limit} characters long`,
  }),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(5)
    .max(255)
    .messages({
      'email.base': 'Email must be a string',
      'email.empty': 'Email cannot be empty',
      'email.email': 'Invalid email',
      'email.min': `Email must be at least {#limit} characters long`,
      'email.max': `Email cannot be more than {#limit} characters long`,
    }),
  password: Joi.string().trim().min(8).max(30).messages({
    'password.base': 'Password must be a string',
    'password.empty': 'Password cannot be empty',
    'password.min': `Password must be at least {#limit} characters long`,
    'password.max': `Password cannot be more than {#limit} characters long`,
  }),
});

const User = model('User', userSchema);
export default User;
