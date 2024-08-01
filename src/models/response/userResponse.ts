export class UserResponse {
  name: string
  email: string
  userId: string
  isAdmin: boolean
  token: string

  constructor(
    name: string,
    email: string,
    userId: string,
    isAdmin: boolean,
    token: string,
  ) {
    this.name = name
    this.email = email
    this.userId = userId
    this.isAdmin = isAdmin
    this.token = token
  }
}
