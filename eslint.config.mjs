import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'antfu/top-level-function': 'off',
    'no-console': 'warn',
    'antfu/if-newline': 'off',
  },
  settings: {
    'import/core-modules': ['vue-router/auto-routes'],
  },
})
