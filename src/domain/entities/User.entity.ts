import mongoose from 'mongoose'
import { UserType } from '../../controllers/types/index'

export const userEntity = () => {
  let userSchema = new mongoose.Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  })

  return mongoose.models.users || mongoose.model<UserType>('users', userSchema)
}
