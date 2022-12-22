import { BasicResponse, UserType } from '../types'

export interface Example {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUserController {
  getUsers: (id?: UserType['id']) => Promise<UserType | UserType[] | undefined>
  deleteUser: (id: UserType['id']) => Promise<any>
  createUser: (user: UserType) => Promise<UserType>
  updateUser: (id: UserType['id'], user: any) => Promise<any>
}

export interface IAuthController {
  registerUser: (user: UserType) => Promise<any>
  loginUser: (auth: any) => Promise<any>
}
