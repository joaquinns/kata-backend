import { UserType } from '../../controllers/types'
import { logError } from '../../utils/logger'
import { userEntity } from '../entities/User.entity'

const userModel = userEntity()

export const getAllUsers = async (): Promise<UserType[] | undefined> => {
  try {
    return await userModel.find({ isDelete: false })
  } catch (error) {
    logError(`[ORM ERROR GETTING ALL THE USERS]: ${error}`)
  }
}

export const getUser = async (id: string): Promise<UserType | undefined> => {
  try {
    const user = await userModel.findById(id)
    return user
  } catch (error) {
    logError(`[ORM ERROR FINDING USER]: ${error}`)
  }
}

export const createUser = async (user: UserType): Promise<any> => {
  try {
    return await userModel.create(user)
  } catch (error) {
    logError(`[ORM ERROR CREATING USER]: ${error}`)
  }
}

export const deleteUser = async (id: string): Promise<any> => {
  try {
    return await userModel.deleteOne({ _id: id })
  } catch (error) {
    logError(`[ORM ERROR DELETING USER]: ${error}`)
  }
}
