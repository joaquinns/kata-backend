import mongoose from 'mongoose'
import { IKata } from '../interfaces/kata.interface'

export const kataEntity = () => {
  let kataSchema = new mongoose.Schema<IKata>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    levels: { type: String, required: true },
    tries: { type: Number, required: true },
    stars: { type: Number, required: true },
    creator: { type: String, required: true },
    participants: { type: [], required: true }
  })

  return mongoose.models.katas || mongoose.model<IKata>('katas', kataSchema)
}
