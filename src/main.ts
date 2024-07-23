import '@unocss/reset/tailwind-compat.css'
import '@/styles/style.css'
import 'uno.css'
import 'vue3-toastify/dist/index.css'

import PrimeVue from 'primevue/config'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
  unstyled: true,
})

app.use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions)

app.mount('#app')
