import { BasicResponse, ErrorResponse, UserType } from '../types'
import { UserResponse } from '../types/userResponse.types'

export interface Example {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUserController {
  getUsers: (
    page: number,
    limit: number,
    id?: string
  ) => Promise<UserType | UserResponse | undefined | ErrorResponse>
  deleteUser: (id: string) => Promise<any>
  createUser: (user: UserType) => Promise<UserType>
  updateUser: (id: string, user: any) => Promise<any>
}

export interface IAuthController {
  registerUser: (user: UserType) => Promise<any>
  loginUser: (auth: any) => Promise<any>
}

export interface IKataController {
  getKatas: (page: number, limit: number, id?: string) => Promise<any>
  deleteKata: (id: string) => Promise<any>
  createKata: (kata: any) => Promise<any>
  updateKata: (id: string, kata: any) => Promise<any>
}
