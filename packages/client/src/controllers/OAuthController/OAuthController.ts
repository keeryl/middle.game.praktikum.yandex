import { OAuthApi } from '../../api/OAuthApi'
import { BASE_URL } from '../../utils/constants'
import { SigninOAuthData } from '../../api/OAuthApi/types'
import { apiErrorsHandler } from '../../utils/apiErrorsHandler'

class OAuthController {
  private api: OAuthApi

  constructor() {
    this.api = new OAuthApi(BASE_URL)
  }

  public async signinOAuth(data: SigninOAuthData) {
    try {
      await this.api.signinOAuth(data)
    } catch (e) {
      apiErrorsHandler(e as number)
    }
  }

  public async getServiceId() {
    try {
      const res = await this.api.getServiceId()
      return res
    } catch (e) {
      apiErrorsHandler(e as number)
    }
  }
}

export const oauthController = new OAuthController()
