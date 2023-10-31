import Joi from 'joi'

export const createUserValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Email is not a valid email format/address',
    }),
  password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/)
  .required()
  .messages({
    'string.pattern.base': 'Password must contain at least one number and at least 6 characters long',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  
}).strict()

export const loginUserValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).strict()

export const updateUserValidator = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  photo: Joi.string().optional().messages({
    'string.pattern.base': 'Please add a photo',
  }),
  phone: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).optional(),
  address: Joi.string().optional()
}).strict()
