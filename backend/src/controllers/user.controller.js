import {
  createUserValidator,
  loginUserValidator,
  updateUserValidator,
} from '../validators/user.validator.js'
import {
  BadUserRequestError,
  NotFoundError,
  UnAuthorizedError,
} from '../errors/error.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { config } from '../config/index.js'
import { generateToken, verifyToken } from '../utils/jwt.utils.js'

export default class UserController {
  static async registerUser(req, res) {
    const { error } = createUserValidator.validate(req.body)
    if (error) throw error
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new BadUserRequestError(`An account with ${email} already exists.`)
    }
    const saltRounds = config.bycrypt_salt_round
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })
    const token = generateToken(user)
    user.accessToken = token
    const userData = user.toObject()
    delete userData.password
    await user.save()
    const maxAge = config.cookie_max_age
    res.cookie('access_token', token, {
      httpOnly: true,
      path: '/',
      // secure: true,
      // sameSite: 'none',
      maxAge,
    })
    res.status(201).json({
      status: 'Success',
      message: 'User created successfully.',
      userData,
    })
  }

  static async loginUser(req, res) {
    const { error } = loginUserValidator.validate(req.body)
    if (error) throw new BadUserRequestError('Invalid login details')
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user) throw new UnAuthorizedError('Invalid login details')
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) throw new UnAuthorizedError('Invalid login details')
    const token = generateToken(user)
    user.accessToken = token
    await user.save()
    const userData = user.toObject()
    delete userData.password
    const maxAge = config.cookie_max_age
    res.cookie('access_token', token, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'none',
      maxAge,
    })

    res.status(200).json({
      status: 'Success',
      message: 'Login successful',
      userData,
    })
  }

  static async logout(req, res) {
    const userId = req.params.id
    const user = await User.findById(userId)
    user.accessToken = null
    await user.save()
    res.cookie('access_token', '', {
      httpOnly: true,
      // secure: true,
      // sameSite: 'none',
      expires: new Date(0),
    })
    res.status(200).json({
      status: 'Success',
      message: 'Logout successful',
    })
  }

  static async getUser(req, res) {
    const userId = req.user._id;
    const id = req.params.id
    if (userId !== id) throw new UnAuthorizedError('Unauthorized!')
    const user = await User.findById(id).select('-password')
    if (!user) throw new NotFoundError('User not found')
    res.status(200).json({
      status: 'Success',
      user,
    })
  }

  static async getLoginStatus(req, res) {
    const token = req.cookies.access_token
    const verified = verifyToken(token)
    if (!verified) {
      res.json(true)
    } 
    res.json(false)
  }

  static async updateUserInfo(req, res) {
    const userId = req.user._id
    if (!userId) throw new UnAuthorizedError('Not authorized')
    if (userId !== req.params.id)
      throw new UnAuthorizedError('You can only change your own')
    const { error } = updateUserValidator.validate(req.body)
    if (error) throw error
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          address: req.body.address,
          name: req.body.name,
          photo: req.body.photo,
          phone: req.body.phone
        },
      },
      { new: true },
    )
    const { password, ...userData } = updatedUser._doc
    res.status(200).json({
      status: 'Success',
      message: 'User information updated successfully',
      userData,
    })
  }

  static async updateUserPhoto(req, res) {
    const { photo } = req.body
    const id = req.user._id;
    const user = await User.findById(id)
    user.photo = photo
    await user.save()
    const { password, ...userData } = updatedUser._doc
    res.status(200).json({
      status: 'Success',
      message: 'User information updated successfully',
      userData,
    })
  }


  //   static async deleteAll(req, res) {
  //     const users =  await User.find()
  //     if(users.length < 1) throw new NotFoundError('No user found')
  //     const deleteUsers = await User.deleteMany()
  //     res.status(200).json({
  //       status: "All users delete successfully",
  //     })
  //   }
  //
}
