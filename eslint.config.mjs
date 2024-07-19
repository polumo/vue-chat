import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'antfu/top-level-function': 'off',
    'no-console': 'warn',
  },
  settings: {
    'import/core-modules': ['vue-router/auto-routes'],
  },
})
