import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([{

  plugins: {
    '@stylistic': stylistic
  },

  linterOptions: {
    reportUnusedInlineConfigs: "error",
  },

  rules: {
    "no-console": 0,
    '@stylistic/indent': ['error', 2],
  },
}]);