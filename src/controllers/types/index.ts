import { Types } from 'mongoose'

export type BasicResponse = {
  msg: string
}

export type ErrorResponse = {
  error: string
  msg: string
}

export type AuthResponse = {
  message: string
  token: string | undefined
}

export type UserType = {
  id?: Types.ObjectId
  name: string
  email: string
  password: string
}
