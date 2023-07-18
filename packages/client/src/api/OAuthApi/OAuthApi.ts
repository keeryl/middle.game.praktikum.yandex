import { SigninOAuthData } from './types'

export class OAuthApi {
  private readonly baseUrl: string
  private readonly apiPath: string = 'oauth'

  constructor(baseUrl: string) {
    this.baseUrl = `${baseUrl}/${this.apiPath}`
  }

  private checkResponse(response: Response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.status)
  }

  public signinOAuth(data: SigninOAuthData) {
    return fetch(`${this.baseUrl}/yandex`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(this.checkResponse)
  }

  public getServiceId() {
    return fetch(
      `${this.baseUrl}/yandex/service-id?redirect_uri=${encodeURIComponent(
        'https://good-game.ya-praktikum.tech'
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    ).then(this.checkResponse)
  }
}
