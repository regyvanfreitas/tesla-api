import { Request, Response } from 'express'
import { storage } from '../firebase-config'
import Car, { CarStatus } from '../models/request/carModel'
import { CarListResponse } from '../models/response/carListResponse'
import { apiResponse } from '../_utils/apiResponse'
import { messages } from '../_utils/messages'

export const createCar = async (req: Request, res: Response) => {
  try {
    const { carName, valuePerDay, valueTotal, year, offerType } = req.body
    const user = req?.user!

    if (!user?.isAdmin)
      return apiResponse(res, 401, null, messages.user.userIsNotAdmin)

    let imageUrl = ''

    if (req.file) {
      const fileName = `cars/${Date.now()}_${req.file.originalname}`
      const fileRef = storage.ref().child(fileName)
      await fileRef.put(req.file.buffer, {
        contentType: req.file.mimetype,
      })
      imageUrl = await fileRef.getDownloadURL()
    }

    const newCar = new Car({
      carName,
      valuePerDay,
      valueTotal,
      year,
      creationUserEmail: user.email,
      urlImageList: [imageUrl],
      carStatus: CarStatus.available,
      offerType,
    })

    await newCar.save()

    return apiResponse(res, 201, newCar)
  } catch (error) {
    apiResponse(res, 500)
  }
}

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.body
    const user = req.user

    if (!user?.isAdmin)
      return apiResponse(res, 401, null, messages.user.userIsNotAdmin)

    if (!carId) return apiResponse(res, 400, null, messages.car.noHasCarId)

    const car = await Car.findByIdAndDelete(carId)

    if (!car) return apiResponse(res, 404, null, messages.car.carNotFound)

    return apiResponse(res, 200, car, messages.car.carDeleteSuccess)
  } catch (error) {
    return apiResponse(res, 500)
  }
}

export const findCarList = async (req: Request, res: Response) => {
  try {
    const carList = await Car.find()

    const carListResponse = CarListResponse.fromCarList(carList)

    return apiResponse(res, 200, carListResponse)
  } catch (error) {
    return apiResponse(res, 500)
  }
}

export const uploadImageCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.body
    const user = req?.user!

    if (!user?.isAdmin)
      return apiResponse(res, 401, null, messages.user.userIsNotAdmin)

    const car = await Car.findById(carId)

    if (!car) return apiResponse(res, 404, messages.car.carNotFound)

    let imageUrl = ''

    if (req.file) {
      const fileName = `cars/${Date.now()}_${req.file.originalname}`
      const fileRef = storage.ref().child(fileName)
      await fileRef.put(req.file.buffer, {
        contentType: req.file.mimetype,
      })
      imageUrl = await fileRef.getDownloadURL()
    }

    car.urlImageList.push(imageUrl)

    await car.save()

    return apiResponse(res, 201, imageUrl)
  } catch (error) {
    apiResponse(res, 500)
  }
}
