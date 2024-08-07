import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'types/typed-router.d.ts',
      exclude: ['src/pages/**/components/*'], // 使组件不生成路由
    }),
    Vue(),
    VueJsx(),
    UnoCSS(),
    AutoImport({
      imports: ['vue', VueRouterAutoImports],
      dts: 'types/auto-import.d.ts',
    }),
    Components({
      resolvers: [
        PrimeVueResolver(),
      ],
      dts: 'types/components.d.ts',
    }),
  ],
  base: '',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
