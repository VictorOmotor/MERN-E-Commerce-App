import { Schema, model, Types } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: [true],
      enum: ["user", "admin"],
      default: "user",
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+234",
    },
    address: {
      type: Object,
      // address, state, country
    },
    accessToken: {
      type: String,
      default: null
    },
    // wishlist: [{ type: ObjectId, ref: "Product" }],
    // balance: {
    //   type: Number,
    //   default: 0,
    // },
    // cartItems: {
    //   type: [Object],
    // },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // stripeuserId: {
    //   type: String,
    //   // required: true,
    // },
  },
  {
    timestamps: true,
  }
)

UserSchema.index({ location: '2dsphere' })

export default model('User', UserSchema)
