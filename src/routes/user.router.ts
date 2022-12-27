import bcrypt from 'bcrypt'
import express, { Request, Response } from 'express'

import { UserController } from '../controllers/user.controller'
import { logInfo } from '../utils/logger'

let usersRoute = express.Router()
const userController: UserController = new UserController()

usersRoute
  .route('/')
  .get(async (req: Request, res: Response) => {
    const userId = req?.query?.id as string | undefined
    const page = (req?.query?.page as number | undefined) || 1
    const limit = (req?.query?.limit as number | undefined) || 10
    logInfo(`Query param: ${userId}`)
    const response = await userController.getUsers(page, limit, userId)
    return res.json(response)
  })
  .delete(async (req: Request, res: Response) => {
    let userId = req.query.id as string
    logInfo(`Query param: ${userId}`)
    const response = await userController.deleteUser(userId)
    return res.send(response)
  })
  .put(async (req: Request, res: Response) => {
    logInfo(req.body)
    const id = req.query.id as string
    const updateUser = {
      name: req?.body?.name,
      email: req?.body?.email
    }
    const response = await userController.updateUser(id, updateUser)
    return res.send(response)
  })
  .post(async (req: Request, res: Response) => {
    logInfo(req.body)
    const { name, email, password } = req.body
    const passwordHash = bcrypt.hashSync(password, 10)
    const newUser = {
      name,
      email,
      password: passwordHash
    }
    const response = await userController.createUser(newUser)
    return res.status(201).json(response)
  })

export default usersRoute
