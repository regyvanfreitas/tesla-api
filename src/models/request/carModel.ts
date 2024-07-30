import mongoose, { Document } from 'mongoose'

export enum CarStatus {
  available = 0,
  rented = 1,
}

interface Car {
  carName: string
  year: string
  valueTotal: number
  valuePerDay: number
  creationUserEmail: string
  urlImage: string
  carStatus: CarStatus
}

const carSchema = new mongoose.Schema<CarDocument>({
  carName: { type: String, required: true },
  year: { type: String, required: true },
  valuePerDay: { type: Number, required: true },
  valueTotal: { type: Number, required: true },
  creationUserEmail: { type: String, required: true },
  urlImage: { type: String, required: true },
  carStatus: { type: Number, required: true, enum: CarStatus },
})

export interface CarDocument extends Document, Car {}

export default mongoose.model<CarDocument>('Car', carSchema)
