import mongoose, { Document } from 'mongoose'

export enum CarStatus {
  available = 0,
  rented = 1,
  sold = 2,
}

export enum OfferType {
  rent = 0,
  sell = 1,
}

interface Car {
  carName: string
  year: string
  valueTotal: number
  valuePerDay: number
  creationUserEmail: string
  urlImageList: string[]
  carStatus: CarStatus
  offerType: OfferType
}

const carSchema = new mongoose.Schema<CarDocument>({
  carName: { type: String, required: true },
  year: { type: String, required: true },
  valuePerDay: { type: Number, required: true },
  valueTotal: { type: Number, required: true },
  creationUserEmail: { type: String, required: true },
  urlImageList: { type: [String], required: true },
  carStatus: { type: Number, required: true, enum: CarStatus },
  offerType: { type: Number, required: true, enum: OfferType },
})

export interface CarDocument extends Document, Car {}

export default mongoose.model<CarDocument>('Car', carSchema)
