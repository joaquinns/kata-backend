import express, { Request, Response } from 'express'
import { KataController } from '../controllers/kata.controller'
import { IKata, kataLevels } from '../domain/interfaces/kata.interface'
import { verifyToken } from '../middlewares/verifyToken.middleware'
import { logInfo } from '../utils/logger'

let katasRoute = express.Router()
const katasController: KataController = new KataController()

katasRoute
  .route('/')
  .get(async (req: Request, res: Response) => {
    const kataId = req?.query?.id as string | undefined
    const page = (req?.query?.page as number | undefined) || 1
    const limit = (req?.query?.limit as number | undefined) || 10
    logInfo(`Query param: ${kataId}`)
    const response = await katasController.getKatas(page, limit, kataId)
    return res.json(response)
  })
  .post(verifyToken, async (req: Request, res: Response) => {
    const name = req?.body?.name
    const description = req?.body?.description || 'Default description'
    const levels = req?.body?.levels || kataLevels.BASIC
    const participants = req?.body?.participants || []
    const stars = req?.body?.stars || 0
    const tries = req?.body?.tries || 0
    const solution = req?.body?.solution || 'Default solution'
    const creator = req.body.creator

    if (
      name &&
      description &&
      levels &&
      participants.length >= 0 &&
      stars >= 0 &&
      tries >= 0 &&
      solution &&
      creator
    ) {
      const newKata: IKata = {
        name: name,
        creator: creator,
        description: description,
        levels: levels,
        participants: participants,
        stars: stars,
        tries: tries,
        solution: solution
      }

      const response = await katasController.createKata(newKata)
      return res.status(201).json(response)
    }

    return res.status(400).json({
      error: 'Something bad happened'
    })
  })
  .delete(async (req: Request, res: Response) => {
    const id = req.query.id as string
    logInfo(`Query param: ${id}`)
    const response = await katasController.deleteKata(id)
    return res.status(response?.status).json(response)
  })
  .put(async (req: Request, res: Response) => {
    const id = req.query.id as string
    const { name, description, levels, solution } = req.body
    // Todo only update chosen fields
    const updatedKata: any = {
      name,
      description,
      levels,
      solution
    }
    // make return the updated document in mongoose
    const response = await katasController.updateKata(id, updatedKata)
    return res.json(response)
  })

export default katasRoute
