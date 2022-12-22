import { Get, Post, Query, Route, Tags } from 'tsoa'
import { IAuth } from '../domain/interfaces/auth.interface'
import { createUser, getUser, loginUser } from '../domain/orm/User.orm'
import { logSuccess } from '../utils/logger'
import { IAuthController } from './interfaces'
import { AuthResponse, ErrorResponse, UserType } from './types'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  /**
   * Endpoint to register a user
   */

  @Post('/register')
  public async registerUser(user: UserType) {
    return await createUser(user)
  }

  @Post('/login')
  public async loginUser(auth: IAuth) {
    let response: AuthResponse | ErrorResponse | undefined = undefined

    if (!auth) {
      return {
        message: 'Please provide an email and password to login'
      }
    }

    const data = await loginUser(auth)
    response = {
      message: `Welcome to the app! ${data?.user?.email}`,
      token: data?.token
    }

    return response
  }

  /**
   * Endpoint to retriev a user from the DB
   * Middleware: Validate JWT
   * In header you must to pass a valid token in [x-access-token] header
   * @param { string } id id of the user to retrieve
   * @return The data from the user
   */

  @Get('/profile')
  public async userData(@Query() id: UserType['id']): Promise<any> {
    let response: any = ''
    if (id) {
      logSuccess(`[api/auth/profile] Get user data by the ID`)
      response = await getUser(id)
    } else {
      return {
        error: 'token not found',
        message: 'you need to pass a token'
      }
    }

    return response
  }
}
