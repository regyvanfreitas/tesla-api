interface User {
  name: string
  email: string
  password: string
  isAdmin: boolean
}
import * as http from 'http'

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    user: User
  }
}
