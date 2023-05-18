import { AuthApi } from '../../api/AuthApi'
import { BASE_URL } from '../../utils/constants'
import { SigninData, SignupData } from '../../api/AuthApi/types'

class AuthController {
  private api: AuthApi

  constructor() {
    this.api = new AuthApi(BASE_URL)
  }

  public async signup(data: SignupData) {
    try {
      await this.api.signup(data)
    } catch (e) {
      alert(e)
    }
  }

  public async signin(data: SigninData) {
    try {
      await this.api.signin(data)
    } catch (e) {
      alert(e)
    }
  }

  public async fetchUser() {
    try {
      const res = await this.api.fetchUser()
      return res
    } catch (e) {
      alert(e)
    }
  }

  public async logOut() {
    try {
      const res = await this.api.logOut()
      return res
    } catch (e) {
      alert(e)
    }
  }
}

export const authController = new AuthController()
