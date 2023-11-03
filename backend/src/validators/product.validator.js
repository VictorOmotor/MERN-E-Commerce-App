import Joi from 'joi'

export const createProductValidator = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.pattern.base': 'Please add a name',
  }),
  sku: Joi.string().optional(),
  category: Joi.string().required().messages({
    'string.pattern.base': 'Please add a category',
  }),
  brand: Joi.string().required().messages({
    'string.pattern.base': 'Please add a brand',
  }),
  color: Joi.string().required().messages({
    'string.pattern.base': 'Please add a color',
  }),
  price: Joi.number().required().messages({
    'string.pattern.base': 'Please add a price',
  }),
  regularPrice: Joi.number().optional(),
  quantity: Joi.number().required().messages({
    'string.pattern.base': 'Please add a quantity',
  }),
  description: Joi.string().required().messages({
    'string.pattern.base': 'Please add a description',
  }),
  imageUrls: Joi.array().required().messages({
    'string.pattern.base': 'Please upload add at least one image',
  }),

}).strict()