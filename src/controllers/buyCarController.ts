import { Request, Response } from 'express'
import { apiResponse } from '../_utils/apiResponse'
import { messages } from '../_utils/messages'
import Buy from '../models/request/buyModel'
import Car, { CarStatus, OfferType } from '../models/request/carModel'

export const buyCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.body
    const { email } = req?.user

    const car = await Car.findById(carId)

    if (!car) return apiResponse(res, 404, false, messages.car.carNotFound)

    if (car.creationUserEmail === email)
      return apiResponse(res, 401, false, messages.buy.unauthorized)

    if (
      car.offerType !== OfferType.sell ||
      car.carStatus !== CarStatus.available
    )
      return apiResponse(res, 401, false, messages.buy.carIsNotSell)

    const newBuy = new Buy({
      carId,
      userEmail: email,
    })

    await newBuy.save()

    car.carStatus = CarStatus.sold

    await car.save()

    return apiResponse(res, 201, newBuy)
  } catch (error) {
    return apiResponse(res, 500)
  }
}
