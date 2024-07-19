import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  content: {
    pipeline: {
      include: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}'],
    },
  },
  shortcuts: [
    ['wh-screen', 'w-screen h-screen'],
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
  ],
})
