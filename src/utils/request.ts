import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { toast } from 'vue3-toastify'

export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
})

instance.interceptors.request.use(
  (config) => {
    config.headers.Token = ''
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response

    toast(data.message, { type: data.code !== 200 && data.code !== 201 ? 'error' : 'success' })

    return data
  },
  (error: AxiosError) => {
    const { message } = (error.response as any).data as ApiResponse
    toast(message, { type: 'error' })
    return Promise.reject(error)
  },
)

const request = async <T = any, R = ApiResponse<T>>(config: AxiosRequestConfig): Promise<R> => {
  return instance.request(config)
}

export default request
