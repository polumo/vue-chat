import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import { useToast } from 'vue-toastification'
import { getToken } from '@/utils/token'

const toast = useToast()

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    {
      path: '/',
      redirect: '/user/login',
    },
  ],
})

router.beforeEach((to, _) => {
  if (!getToken() && to.path === '/chat') {
    toast.info('登录后再来聊天吧')
    return '/user/login'
  }
  return true
})

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}
