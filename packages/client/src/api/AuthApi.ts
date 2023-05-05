import { BASE_URL } from '../utils/constants'

export interface SignupData {
  first_name: string
  second_name: string
  display_name?: string
  login: string
  email: string
  password: string
  phone: string
}

interface SigninData {
  login: string
  password: string
}

class AuthApi {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private checkResponse(response: Response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.status)
  }

  public signup(signupData: SignupData) {
    const { first_name, second_name, login, email, password, phone } =
      signupData
    return fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: first_name,
        second_name: second_name,
        login: login,
        email: email,
        password: password,
        phone: phone,
      }),
    }).then(this.checkResponse)
  }

  public signin(signinData: SigninData) {
    const { login, password } = signinData
    return fetch(`${this.baseUrl}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    }).then(this.checkResponse)
  }

  public fetchUser() {
    return fetch(`${this.baseUrl}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this.checkResponse)
  }
}

export default new AuthApi(BASE_URL)
