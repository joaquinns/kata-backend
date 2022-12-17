import { BasicResponse, UserType } from '../types'

export interface Example {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface User {
  getUsers: (id?: string) => Promise<UserType | UserType[] | undefined>
  deleteUser: (id: string) => Promise<any>
  createUser: (user: UserType) => Promise<UserType>
}
