import { SigninData, SignupData } from './types'

export class AuthApi {
  private readonly baseUrl: string
  private readonly apiPath: string = 'auth'

  constructor(baseUrl: string) {
    this.baseUrl = `${baseUrl}/${this.apiPath}`
  }

  private checkResponse(response: Response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.status)
  }

  public signup(data: SignupData) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this.checkResponse)
  }

  public signin(data: SigninData) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this.checkResponse)
  }

  public fetchUser() {
    return fetch(`${this.baseUrl}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this.checkResponse)
  }
}
