import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import perfectionist from 'eslint-plugin-perfectionist'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  // JavaScript
  js.configs.recommended,

  // Typescript
  ...tseslint.configs.recommended,

  // Perfectionist
  {
    plugins: {
      perfectionist: perfectionist,
    },
    rules: perfectionist.configs['recommended-natural'].rules,
  },

  // Turbo
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },

  {
    plugins: {
      onlyWarn,
    },
  },

  // Ignored folders
  {
    ignores: [
      "dist/**",
      "build/**",
      "coverage/**",
      ".turbo/**",
      ".next/**",
      "node_modules/**",
      "**/*.json",
      ".vscode/**",
    ],
  },

  // Prettier
  eslintConfigPrettier,
];
