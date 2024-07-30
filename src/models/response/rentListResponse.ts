export class RentLisResponse {
  rentId: string
  totalDays: number
  totalValue: number
  carId: string
  carName: string
  startDate: Date
  endDate: Date

  constructor(
    rentId: string,
    totalDays: number,
    totalValue: number,
    carId: string,
    carName: string,
    startDate: Date,
    endDate: Date,
  ) {
    this.rentId = rentId
    this.totalDays = totalDays
    this.totalValue = totalValue
    this.carId = carId
    this.carName = carName
    this.startDate = startDate
    this.endDate = endDate
  }

  static fromRentList(rentList: any[]): RentLisResponse[] {
    return rentList.map(
      rent =>
        new RentLisResponse(
          rent.id,
          rent.totalDays,
          rent.totalValue,
          rent.carId,
          rent.carName,
          rent.startDate,
          rent.endDate,
        ),
    )
  }
}
