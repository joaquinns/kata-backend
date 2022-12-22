import { BasicResponse, UserType } from '../types'

export interface Example {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUserController {
  getUsers: (id?: string) => Promise<UserType | UserType[] | undefined>
  deleteUser: (id: string) => Promise<any>
  createUser: (user: UserType) => Promise<UserType>
  updateUser: (id: string, user: any) => Promise<any>
}

export interface IAuthController {
  registerUser: (user: UserType) => Promise<any>
  loginUser: (auth: any) => Promise<any>
}
