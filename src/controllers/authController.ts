import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { apiResponse } from '../_utils/apiResponse'
import { messages } from '../_utils/messages'
import User from '../models/request/userModel'
import { UserResponse } from '../models/response/userResponse'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const passwordMatches = await bcrypt.compare(password, user?.password)

    if (!user || !passwordMatches)
      return apiResponse(res, 401, null, messages.user.invalidUser)

    const userResponse = new UserResponse(
      user.name,
      user.email,
      user.id,
      user.isAdmin,
    )

    apiResponse(res, 200, userResponse, messages.user.loginSuccess)
  } catch (error) {
    apiResponse(res, 500)
  }
}
