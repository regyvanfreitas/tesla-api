import { Request, Response } from 'express'
import { apiResponse } from '../_utils/apiResponse'
import { messages } from '../_utils/messages'
import Car, { CarStatus } from '../models/request/carModel'
import Rent from '../models/request/rentModel'
import { RentLisResponse } from '../models/response/rentListResponse'
import { differenceInDays } from 'date-fns'

export const createRent = async (req: Request, res: Response) => {
  try {
    const { carId, startDate, endDate } = req.body
    const { email } = req?.user

    const car = await Car.findById(carId)

    if (car.carStatus === CarStatus.rented)
      apiResponse(res, 400, null, messages.rent.carRented)

    const totalDays = differenceInDays(endDate, startDate) + 1

    const newRent = new Rent({
      carId,
      totalDays,
      userEmail: email,
      carName: car?.carName,
      totalValue: totalDays * car?.valuePerDay,
      startDate,
      endDate,
    })

    await newRent.save()

    car.carStatus = CarStatus.rented
    await car.save()

    return apiResponse(res, 201, newRent)
  } catch (error) {
    return apiResponse(res, 500)
  }
}

export const deleteRent = async (req: Request, res: Response) => {
  try {
    const { rentId } = req.body
    const { email } = req?.user

    if (!rentId) return apiResponse(res, 400, null, messages.rent.idIsRequired)

    const rent = await Rent.findById(rentId)

    if (rent && rent.userEmail !== email)
      return apiResponse(res, 401, null, messages.rent.errorCancel)

    const rentDelete = await Rent.findByIdAndDelete(rentId)

    if (!rentDelete) return apiResponse(res, 404, null, messages.rent.notFound)

    const car = await Car.findById(rent.carId)
    car.carStatus = CarStatus.available
    await car.save()

    return apiResponse(res, 200, rent, messages.rent.cancelSuccess)
  } catch (error) {
    return apiResponse(res, 500)
  }
}

export const findRentListByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req?.user
    const rentList = await Rent.find({ userEmail: email })

    const rentListResponse = RentLisResponse.fromRentList(rentList)

    return apiResponse(res, 200, rentListResponse)
  } catch (error) {
    return apiResponse(res, 500)
  }
}
