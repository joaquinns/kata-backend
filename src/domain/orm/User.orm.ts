import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { ErrorResponse, UserType } from '../../controllers/types'
import { logError } from '../../utils/logger'
import { userEntity } from '../entities/User.entity'
import { IAuth } from '../interfaces/auth.interface'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET as string

const userModel = userEntity()

export const getAllUsers = async (): Promise<UserType[] | undefined> => {
  try {
    return await userModel.find({ isDelete: false })
  } catch (error) {
    logError(`[ORM ERROR GETTING ALL THE USERS]: ${error}`)
  }
}

export const getUser = async (
  id: UserType['id']
): Promise<UserType | ErrorResponse> => {
  try {
    const user = await userModel.findById(id).select('-password')
    return user
  } catch (error) {
    logError(`[ORM ERROR FINDING USER]: ${error}`)
    return {
      error: 'NOT FOUND',
      msg: 'User not found'
    }
  }
}

export const createUser = async (user: UserType): Promise<any> => {
  try {
    return await userModel.create(user)
  } catch (error) {
    logError(`[ORM ERROR CREATING USER]: ${error}`)
  }
}

export const updateUser = async (
  id: UserType['id'],
  user: any
): Promise<any> => {
  try {
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error) {
    logError(`[ORM ERROR UPDATING USER]: ${error}`)
  }
}

export const deleteUser = async (id: UserType['id']): Promise<any> => {
  try {
    return await userModel.deleteOne({ _id: id })
  } catch (error) {
    logError(`[ORM ERROR DELETING USER]: ${error}`)
  }
}

export const loginUser = async (
  auth: IAuth
): Promise<{ user?: UserType; token: string } | undefined> => {
  try {
    let userFound: UserType | undefined = undefined
    await userModel
      .findOne({ email: auth.email })
      .then((user: UserType) => {
        userFound = user
      })
      .catch((err: any) => console.log(err))

    const validPassword = bcrypt.compareSync(auth.password, userFound!.password)

    if (!validPassword) {
      console.error(`[Error Authentication in ORM]: Not valid password`)

      throw new Error('[Error Authentication in ORM]: Not valid password')
    }

    // create jwt token
    const jwtToken = jwt.sign(
      // Todo to search how to add the object id from mongodb
      { id: userFound!.id, email: userFound!.email },
      jwtSecret,
      {
        expiresIn: 86400
      }
    )

    return {
      user: userFound,
      token: jwtToken
    }
  } catch (error) {}
}
