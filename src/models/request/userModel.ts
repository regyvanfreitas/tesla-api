import mongoose, { Document } from 'mongoose'

interface User {
  name: string
  email: string
  password: string
  isAdmin: boolean
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false },
})

export interface UserDocument extends Document, User {}

export default mongoose.model<UserDocument>('User', userSchema)
