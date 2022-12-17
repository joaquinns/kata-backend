export type BasicResponse = {
  msg: string
}

export type ErrorResponse = {
  error: string
  msg: string
}

export type UserType = {
  id?: string
  name: string
  email: string
}
