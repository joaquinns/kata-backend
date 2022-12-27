import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser
} from '../domain/orm/User.orm'
import { logSuccess } from '../utils/logger'
import { IUserController } from './interfaces'
import { ErrorResponse, UserType } from './types'
import { UserResponse } from './types/userResponse.types'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * Endpoint to retrieve users from the DB
   * @param { string } userId
   * @returns All the users or an user found by id
   */

  @Get('/')
  public async getUsers(
    page: number,
    limit: number,
    @Query() id?: string
  ): Promise<UserType | UserResponse | undefined | ErrorResponse> {
    if (id) {
      logSuccess(`[/api/users?id=${id}] Get user`)
      return await getUser(id)
    }
    logSuccess(`[/api/users] Get all the users`)
    return await getAllUsers(page, limit)
  }

  @Post('/')
  public async createUser(user: UserType): Promise<UserType> {
    const newUser = await createUser(user)
    return newUser
  }

  @Put('/')
  public async updateUser(id: string, user: any) {
    return await updateUser(id, user)
  }

  /**
   * Endpoint to delete an user from the DB
   * @param {string} userId
   * @returns Deleted user
   */

  @Delete('/')
  public async deleteUser(@Query() id: string) {
    logSuccess(`[/api/users?id=${id}] Deleting user`)
    return await deleteUser(id)
  }
}
