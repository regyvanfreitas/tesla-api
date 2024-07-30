import { NextFunction, Request, Response } from 'express'
import { apiResponse } from '../_utils/apiResponse'
import { messages } from '../_utils/messages'
import UserModel from '../models/request/userModel'

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body

    if (!email)
      return apiResponse(res, 400, null, messages.user.emailIsRequired)

    const user = await UserModel.findOne({ email })

    if (!user) return apiResponse(res, 404, null, messages.user.notFound)

    req.user = user
    next()
  } catch (error) {
    console.log(error)

    apiResponse(res, 500)
  }
}

export default verifyUser
