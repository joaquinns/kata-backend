// enviroment
import dotenv from 'dotenv'
import server from './src/server'
import { logError, logSuccess } from './src/utils/logger'

dotenv.config()

const port = process.env.PORT || 8080
server.listen(port, () => {
  logSuccess(`[SERVER RUN] Listening on: http://localhost:${port}/api`)
})

server.on('error', (error) => {
  logError(`[SERVER ERROR] ${error}`)
})
