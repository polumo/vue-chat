import '@unocss/reset/tailwind-compat.css'
import '@/styles/style.css'
import 'uno.css'
import 'vue-toastification/dist/index.css'

import PrimeVue from 'primevue/config'
import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
  unstyled: true,
})

const options: PluginOptions = {
  timeout: 3000,
}
app.use(Toast, options)

app.mount('#app')
