import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { apiResponse } from '../_utils/apiResponse'
import { messages } from '../_utils/messages'
import User from '../models/request/userModel'
import { UserResponse } from '../models/response/userResponse'

dotenv.config()

const secret = process.env.SECRET_KEY
const expirationTime = process.env.JWT_EXPIRATION_TIME

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return apiResponse(res, 401, null, messages.user.invalidUser)
    }

    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      return apiResponse(res, 401, null, messages.user.invalidUser)
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      secret,
      { expiresIn: `${expirationTime}h` },
    )

    const userResponse = new UserResponse(
      user.name,
      user.email,
      user.id,
      user.isAdmin,
      token,
    )

    apiResponse(res, 200, userResponse)
  } catch (error) {
    apiResponse(res, 500)
  }
}
