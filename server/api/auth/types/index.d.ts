export type LoginRequest = {
  password: string
  email: string
}

export type RegisterRequest = {
  password: string
  nickname: string
  email: string
}

export type User = {
  nickname: string
  email: string
  id: number
}

export type TokenResponse = {
  token: string
}