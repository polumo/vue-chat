/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  VITE_BASE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
