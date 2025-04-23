import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([{

  plugins: {
    '@stylistic': stylistic,
  },

  rules: {
    '@stylistic/arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/no-extra-semi': 'error',
    '@stylistic/semi-style': ['error', 'last'],
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/brace-style': ['error', 'stroustrup'],
    '@stylistic/comma-dangle': ['error', { arrays: 'always-multiline', objects: 'always-multiline' }],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/quote-props': ['error', 'as-needed', { unnecessary: true }],
    '@stylistic/indent': ['error', 2],
  },
}])
