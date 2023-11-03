import Product from "../models/product.model.js"
import { BadUserRequestError, NotFoundError, UnAuthorizedError } from "../errors/error.js"
import { createProductValidator } from "../validators/product.validator.js";
import {Types} from "mongoose";

export default class ProductController {
    static async createProduct(req, res) {
    const { error } = createProductValidator.validate(req.body)
    if (error) throw error
    const product = await Product.create(req.body);
    res.status(201).json(product);
    }   
    
    static async getProducts(req, res) {
    const products = await Product.find().sort('-createdAt');
    if (products.length < 1 ) throw new NotFoundError('No product available')
    res.status(200).json(products);
    }

    static async getProduct(req, res) {
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) throw new NotFoundError('Product not found!')
    res.status(200).json(product);
    }

    static async deleteProduct(req, res) {
    const id = req.params.id
    const userId = req.user._id
    const product = await Product.findById(id)
    if (!product) throw new NotFoundError('Product not found')
    if (userId !== product.user)
      throw new UnAuthorizedError('You can only delete your own product!')
    await Product.findByIdAndDelete(id)
    res.status(200).json({
      status: 'Success',
      message: 'Product deleted successfully!',
    })
    }

    static async updateProduct(req, res) {
    const id = req.params.id
    const { error } = createProductValidator.validate(req.body)
    if (error) throw error
    const userId = req.user._id
    const product = await Product.findById(id)
    if (!product) throw new NotFoundError('Product not found')
    if (userId !== product.user)
      throw new UnAuthorizedError('You can only update your own product!')
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
    })
    res.status(200).json(updatedProduct)
    }
    
    static async reviewProduct(req, res) {
    const id = req.params.id
    const userId = req.user._id
    const {star, review, reviewDate} = req.body
    if (star < 1 || !review) throw new BadUserRequestError('Please add a review and a star')
    const product = await Product.findById(id)
    if (!product) throw new NotFoundError('Product not found')
    product.ratings.push(
        {
            star,
            review,
            reviewDate,
            name: req.user.name,
            userId
        }
        )
    product.save()
    
    res.status(200).json({
        message: 'Product review added',
        product
    })
        
    }

    static async deleteReview(req, res) {
    const id = req.params.id
    const userId = req.user._id
    const product = await Product.findById(id)
    if (!product) throw new NotFoundError('Product not found')
    
    const newRatings = product.ratings.filter((rating) => {
        return rating.userId.toString() !== userId.toString()
    })
    product.ratings = newRatings
    product.save()
    res.status(200).json({
        message: 'Product review deleted'
    })
        
    }

    static async updateReview(req, res) {
    const id = req.params.id
    const userId = req.user._id
    const {star, review, reviewDate} = req.body
    if (star < 1 || !review) throw new BadUserRequestError('Please add a review and a star')
    const product = await Product.findById(id)
    if (!product) throw new NotFoundError('Product not found')
    if(userId.toString() !== product.ratings.userId) throw new UnAuthorizedError('Not Authorized to update this review')
    const updatedReview = await Product.findByIdAndUpdate(
        {
            _id: product._id,
            'ratings.userId': Types.ObjectId(userId)
        },
        {
            $set: {
                'ratings.$.star': star,
                'ratings.$.review': review,
                'ratings.$.reviewDate': reviewDate,
            }
        }

    )
    if(!updatedReview) throw new BadUserRequestError('Not able to update review')
    res.status(200).json({
        message: 'Product review updated'
    })
    }
}
