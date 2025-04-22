import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([{

  plugins: {
    '@stylistic': stylistic,
  },

  rules: {
    'no-console': 0,
    '@stylistic/arrow-parens': ['error', 'always'],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/no-extra-semi': 'error',
    '@stylistic/semi-style': ['error', 'last'],
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/brace-style': ['error', 'stroustrup'],
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/indent': ['error', 2],
  }
}])
