import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { useToast } from 'vue-toastification'

export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
})

const toast = useToast()

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

    const type = data.code !== 200 && data.code !== 201 ? 'error' : 'success'
    toast[type](data.message)

    return data
  },
  (error: AxiosError) => {
    const { message } = (error.response as any).data as ApiResponse
    toast.error(message)
    return Promise.reject(error)
  },
)

const request = async <T = any, R = ApiResponse<T>>(config: AxiosRequestConfig): Promise<R> => {
  return instance.request(config)
}

export default request
