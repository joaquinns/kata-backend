import express, { Request, Response } from 'express'

import { UserController } from '../controllers/user.controller'
import { logInfo } from '../utils/logger'

let usersRoute = express.Router()
const userController: UserController = new UserController()

usersRoute
  .route('/')
  .get(async (req: Request, res: Response) => {
    let userId = req?.query?.id as string | undefined
    logInfo(`Query param: ${userId}`)
    const response: any = await userController.getUsers(userId)
    return res.send(response)
  })
  .delete(async (req: Request, res: Response) => {
    let userId = req.query.id as string
    logInfo(`Query param: ${userId}`)
    const response = userController.deleteUser(userId)
    return res.send(response)
  })
  .post(async (req: Request, res: Response) => {
    logInfo(req.body)
    const newUser = {
      name: req.body.name as string,
      email: req.body.email as string
    }
    const response = userController.createUser(newUser)
    return res.send(response)
  })

export default usersRoute
