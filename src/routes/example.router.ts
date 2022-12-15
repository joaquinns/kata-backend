import express, { Request, Response } from 'express'
import { ExampleController } from '../controllers/example.controller'
import { logInfo } from '../utils/logger'

let exampleRoute = express.Router()

exampleRoute.route('/').get(async (req: Request, res: Response) => {
  // Obtain query param
  let name: any = req?.query?.name
  logInfo(`Query param: ${name}`)
  // Instance of controller
  const controller = new ExampleController()
  const response = await controller.getMessage(name)
  return res.json(response)
})

export default exampleRoute
