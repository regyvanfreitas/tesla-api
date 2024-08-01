import mongoose, { Document, Schema } from 'mongoose'

interface Buy {
  carId: mongoose.Types.ObjectId
  userEmail: string
}

const buySchema = new mongoose.Schema<BuyDocument>({
  carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  userEmail: { type: String, required: true },
})

export interface BuyDocument extends Document, Buy {}

export default mongoose.model<BuyDocument>('Buy', buySchema)
