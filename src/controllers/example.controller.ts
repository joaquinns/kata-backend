import { Get, Query, Route, Tags } from 'tsoa'
import { logSuccess } from '../utils/logger'
import { Example } from './interfaces'
import { BasicResponse } from './types'

@Route('/api/example')
@Tags('ExampleController')
export class ExampleController implements Example {
  /**
   * Endpoint to retrieve a message "Hello {name}" in JSON
   * @param { string | undefined} name // name of the user
   * @returns {BasicResponse} // Promise response
   */
  @Get('/')
  public async getMessage(@Query() name?: string): Promise<BasicResponse> {
    logSuccess('[/api/example] GET RESPONSE')
    return { msg: `hello ${name || 'world'}` }
  }
}
