import FetchFactory from '~/repository/factory'

import type {
  RegisterRequest,
  TokenResponse,
  LoginRequest,
  User,
} from './types'

class AuthModule extends FetchFactory {
  public register(data: RegisterRequest) {
    return this.post<TokenResponse>('/auth/register', data)
  }

  public login(data: LoginRequest) {
    return this.post<TokenResponse>('/auth/login', data)
  }

  public getCurrentUser() {
    return this.post<User>('/auth/user')
  }
}

export default AuthModule
