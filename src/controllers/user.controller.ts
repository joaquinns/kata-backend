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
import { UserType } from './types'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * Endpoint to retrieve users from the DB
   * @param { string | undefined } userId
   * @returns All the users or an user found by id
   */

  @Get('/')
  public async getUsers(@Query() id?: UserType['id']) {
    if (id) {
      logSuccess(`[/api/users?id=${id}] Get user`)
      return await getUser(id)
    }
    logSuccess(`[/api/users] Get all the users`)
    return await getAllUsers()
  }

  @Post('/')
  public async createUser(user: UserType): Promise<UserType> {
    const newUser = await createUser(user)
    return newUser
  }

  @Put('/')
  public async updateUser(id: UserType['id'], user: any) {
    return await updateUser(id, user)
  }

  /**
   * Endpoint to delete an user from the DB
   * @param {string} userId
   * @returns Deleted user
   */

  @Delete('/')
  public async deleteUser(@Query() id: UserType['id']) {
    logSuccess(`[/api/users?id=${id}] Deleting user`)
    return await deleteUser(id)
  }
}
