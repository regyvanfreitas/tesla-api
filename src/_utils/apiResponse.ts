import { Response } from 'express'
import { createApiResponse } from '../models/response/response'
import { messages } from './messages'

export const apiResponse = (
  res: Response,
  status: number,
  data?: any,
  message?: string,
) => {
  const statusSuccess = [200, 201]
  const isSuccess = statusSuccess.includes(status)
  const isInternalError = status === 500

  return res
    .status(status)
    .json(
      createApiResponse(
        isSuccess,
        data,
        isInternalError ? messages.internalError : message,
      ),
    )
}
