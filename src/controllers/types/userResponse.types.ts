import { UserType } from './index'

export type UserResponse = {
  users: UserType[]
  currentPage: number
  totalPages: number
}
