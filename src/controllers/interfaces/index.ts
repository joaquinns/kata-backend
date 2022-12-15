import { BasicResponse } from '../types'

export interface Example {
  getMessage: (name?: string) => Promise<BasicResponse>
}
