import { Schema, model, Types, Query }  from "mongoose";
import slugify from "slugify";

const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        min: [2, 'Name must be at least 2 characters long'],
        required: [true, 'Please add a name']
    },
    sku: {
        type: String,
        required: true,
        default: 'SKU',
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand'],
        trim: true,
        default: 'As seen'
    },
    color: {
        type: String,
        required: [true, 'Please add a color'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        trim: true
    },
    regularPrice: {
        type: Number,
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Please add a quantity'],
        trim: true
    },
    sold: {
        type: Number,
        default: 0,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true,
    },
    imageUrls: {
      type: Array,
    },
    ratings: {
      type: [Object],
    },
    slug: {
        type: String,
        trim: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    timestamps: true
})

ProductSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});



export default model("Product", ProductSchema)



