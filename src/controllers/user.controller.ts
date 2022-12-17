import { Delete, Get, Post, Query, Route, Tags } from 'tsoa'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser
} from '../domain/orm/User.orm'
import { logSuccess } from '../utils/logger'
import { User } from './interfaces'
import { UserType } from './types'

@Route('/api/users')
@Tags('UserController')
export class UserController implements User {
  /**
   * Endpoint to retrieve users from the DB
   * @param { string | undefined } userId
   * @returns All the users or an user found by id
   */

  @Get('/')
  public async getUsers(@Query() id?: string) {
    if (id) {
      logSuccess(`[/api/users?id=${id}] Get user`)
      return await getUser(id)
    }
    logSuccess(`[/api/users] Get all the users`)
    return await getAllUsers()
  }

  @Post('/')
  public async createUser(user: UserType) {
    return await createUser(user)
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
