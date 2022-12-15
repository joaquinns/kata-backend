import { logError } from '../../utils/logger'
import { userEntity } from '../entities/User.entity'

export const getAllUsers = async () => {
  try {
    let userModel = userEntity()
    return await userModel.find({ isDelete: false })
  } catch (error) {
    logError(`[ORM ERROR]: ${error}`)
  }
}
