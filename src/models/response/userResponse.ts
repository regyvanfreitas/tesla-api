export class UserResponse {
  name: string
  email: string
  userId: string
  isAdmin: boolean

  constructor(name: string, email: string, userId: string, isAdmin: boolean) {
    this.name = name
    this.email = email
    this.userId = userId
    this.isAdmin = isAdmin
  }
}
