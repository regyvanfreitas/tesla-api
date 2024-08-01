import { CarStatus, OfferType } from '../request/carModel'

export class CarListResponse {
  carName: string
  creationUserEmail: string
  carId: string
  year: string
  valuePerDay: number
  valueTotal: number
  urlImageList: string[]
  carStatus: CarStatus
  offerType: OfferType

  constructor(
    carName: string,
    creationUserEmail: string,
    carId: string,
    year: string,
    valuePerDay: number,
    valueTotal: number,
    urlImageList: string[],
    carStatus: CarStatus,
    offerType: OfferType,
  ) {
    this.carName = carName
    this.creationUserEmail = creationUserEmail
    this.carId = carId
    this.year = year
    this.valuePerDay = valuePerDay
    this.valueTotal = valueTotal
    this.urlImageList = urlImageList
    this.carStatus = carStatus
    this.offerType = offerType
  }

  static fromCarList(carList: any[]): CarListResponse[] {
    return carList.map(
      car =>
        new CarListResponse(
          car.carName,
          car.creationUserEmail,
          car.id,
          car.year,
          car.valuePerDay,
          car.valueTotal,
          car.urlImageList,
          car.carStatus,
          car.offerType,
        ),
    )
  }
}
