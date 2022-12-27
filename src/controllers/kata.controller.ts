import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IKata } from '../domain/interfaces/kata.interface'
import {
  createKata,
  deleteKata,
  getAllKatas,
  getKata,
  updateKata
} from '../domain/orm/kata.orm'
import { logSuccess } from '../utils/logger'
import { IKataController } from './interfaces'

@Route('/api/katas')
@Tags('KatasController')
export class KataController implements IKataController {
  /**
   *  Endpoint to retrieve all the katas or a kata from DB
   */

  @Get('/')
  public async getKatas(
    page: number,
    limit: number,
    @Query() id?: string
  ): Promise<any> {
    if (id) {
      logSuccess(`[/api/katas?id=${id}] GET kata`)
      return await getKata(id)
    }
    logSuccess(`[/api/katas] GET all the katas`)
    return await getAllKatas(page, limit)
  }

  @Post('/')
  public async createKata(kata: IKata): Promise<any> {
    logSuccess(`[/api/katas] POST to create the kata`)
    return await createKata(kata)
  }

  @Put('/')
  public async updateKata(id: string, kata: IKata): Promise<any> {
    logSuccess(`[/api/katas?id=${id}] PUT to update the kata`)
    return await updateKata(id, kata)
  }

  @Delete('/')
  public async deleteKata(id: string): Promise<any> {
    logSuccess(`[/api/katas?id=${id}] DELETE Deleting kata`)
    return await deleteKata(id)
  }
}
