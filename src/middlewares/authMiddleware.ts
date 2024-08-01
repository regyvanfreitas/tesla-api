import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { apiResponse } from '../_utils/apiResponse'
import { messages } from '../_utils/messages'
import UserModel from '../models/request/userModel'

dotenv.config()

const secret = process.env.SECRET_KEY

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return apiResponse(res, 401)
    }

    let decoded
    try {
      decoded = jwt.verify(token, secret) as {
        userId: string
        email: string
      }
    } catch (err) {
      return apiResponse(res, 401)
    }

    const user = await UserModel.findById(decoded.userId)

    if (!user) {
      return apiResponse(res, 404, null, messages.user.notFound)
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error)
    apiResponse(res, 500)
  }
}

export default verifyUser
