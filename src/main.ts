import '@unocss/reset/tailwind-compat.css'
import '@/styles/style.css'
import 'uno.css'

import PrimeVue from 'primevue/config'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
  unstyled: true,
})

app.mount('#app')
