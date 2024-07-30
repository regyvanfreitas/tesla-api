import mongoose, { Document, Schema } from 'mongoose'

interface Rent {
  carId: mongoose.Types.ObjectId
  totalDays: number
  totalValue: number
  carName: string
  userEmail: string
  startDate: Date
  endDate: Date
}

const rentSchema = new mongoose.Schema<RentDocument>({
  carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  totalDays: { type: Number, required: true },
  userEmail: { type: String, required: true },
  totalValue: { type: Number, required: true },
  carName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
})

export interface RentDocument extends Document, Rent {}

export default mongoose.model<RentDocument>('Rent', rentSchema)
