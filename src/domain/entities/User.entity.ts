import mongoose from 'mongoose'

export const userEntity = () => {
  let userSchema = new mongoose.Schema({
    name: String,
    email: String
  })

  return mongoose.model('users', userSchema)
}
