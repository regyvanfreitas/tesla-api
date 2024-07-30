import { CarStatus } from '../request/carModel'

export class CarLisResponse {
  carName: string
  creationUserEmail: string
  carId: string
  year: string
  valuePerDay: number
  valueTotal: number
  urlImage: string
  carStatus: CarStatus

  constructor(
    carName: string,
    creationUserEmail: string,
    carId: string,
    year: string,
    valuePerDay: number,
    valueTotal: number,
    urlImage: string,
    carStatus: CarStatus,
  ) {
    this.carName = carName
    this.creationUserEmail = creationUserEmail
    this.carId = carId
    this.year = year
    this.valuePerDay = valuePerDay
    this.valueTotal = valueTotal
    this.urlImage = urlImage
    this.carStatus = carStatus
  }

  static fromCarList(carList: any[]): CarLisResponse[] {
    return carList.map(
      car =>
        new CarLisResponse(
          car.carName,
          car.creationUserEmail,
          car.id,
          car.year,
          car.valuePerDay,
          car.valueTotal,
          car.urlImage,
          car.carStatus,
        ),
    )
  }
}
