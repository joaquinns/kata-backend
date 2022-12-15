import { logSuccess } from '../utils/logger'
import { Example } from './interfaces'
import { BasicResponse } from './types'

export class ExampleController implements Example {
  public async getMessage(name?: string): Promise<BasicResponse> {
    logSuccess('[/api/example] GET RESPONSE')
    return { msg: `hello ${name || 'world'}` }
  }
}
