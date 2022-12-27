import dotenv from 'dotenv'
import { logError } from '../../utils/logger'
import { kataEntity } from '../entities/Kata.entity'
import { IKata } from '../interfaces/kata.interface'

dotenv.config()

const kataModel = kataEntity()

/**
 *  Method to obtain all the katas
 */

export const getAllKatas = async (
  page: number,
  limit: number
): Promise<any> => {
  try {
    const response: any = {
      katas: [],
      totalPages: 0,
      currentPage: page
    }
    // Search for user with pagination
    await kataModel
      .find({ isDelete: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas
      })

    // Count all the kata documents from the db
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })

    return response
  } catch (error) {
    logError(`[ORM ERROR GETTING ALL THE KATAS]: ${error}`)
  }
}

export const getKata = async (id: string): Promise<any> => {
  try {
    const user = await kataModel.findById(id)
    return user
  } catch (error) {
    logError(`[ORM ERROR FINDING USER]: ${error}`)
    return {
      error: 'NOT FOUND',
      msg: 'User not found'
    }
  }
}

export const createKata = async (kata: any): Promise<any> => {
  try {
    return await kataModel.create(kata)
  } catch (error) {
    logError(`[ORM ERROR CREATING USER]: ${error}`)
  }
}

export const updateKata = async (id: string, kata: any): Promise<any> => {
  try {
    // make return the updated document in mongoose
    return await kataModel.findByIdAndUpdate(id, kata, {
      // option to return the updated doc
      returnDocument: 'after'
    })
  } catch (error) {
    logError(`[ORM ERROR UPDATING USER]: ${error}`)
  }
}

export const deleteKata = async (id: string): Promise<any> => {
  try {
    if (!id) {
      return {
        status: 400,
        error: 'You need to provide an id'
      }
    }
    const kata = await kataModel.findById(id)

    if (!kata) {
      return {
        status: 404,
        error: 'Not found'
      }
    }

    return await kataModel.deleteOne({ _id: id }).then((_data) => {
      return {
        status: 204,
        message: 'Delete success'
      }
    })
  } catch (error) {
    logError(`[ORM ERROR DELETING USER]: ${error}`)
    return {
      status: 400,
      error: 'You need to provided a valid id'
    }
  }
}
