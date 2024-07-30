import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { apiResponse } from '../_utils/apiResponse'
import { messages } from '../_utils/messages'
import User, { UserDocument } from '../models/request/userModel'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdmin } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser)
      return apiResponse(res, 400, null, messages.user.userExisting)

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser: UserDocument = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    })
    await newUser.save()

    return apiResponse(res, 201, newUser.email, messages.user.createUserSuccess)
  } catch (error) {
    return apiResponse(res, 500)
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword, password } = req.body
    const user = await User.findOne({ email })

    if (!user) return apiResponse(res, 400, null, messages.user.notFound)

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch)
      return apiResponse(res, 400, null, messages.user.incorrectPassword)

    const saltRounds = 10
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    user.password = hashedNewPassword
    await user.save()

    return apiResponse(res, 200, null, messages.user.resetPasswordSuccess)
  } catch (error) {
    return apiResponse(res, 500)
  }
}
