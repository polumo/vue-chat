import request from '@/utils/request'

export interface LoginParam {
  email: string
  password: string
}

export interface RegisterParam extends LoginParam {
  username: string
}

const loginUser = (data: LoginParam) => {
  return request<string>({
    url: '/user/login',
    method: 'POST',
    data,
  })
}

const registerUser = (data: RegisterParam) => {
  return request({
    url: '/user/register',
    method: 'POST',
    data,
  })
}

export { loginUser, registerUser }
