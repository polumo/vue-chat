import { useCookies } from '@vueuse/integrations/useCookies'

const { set, get, remove } = useCookies(['token'])

const setToken = (value: string) => set('token', value)

const getToken = () => get('token')

const removeToken = () => remove('token')

export { setToken, getToken, removeToken }
