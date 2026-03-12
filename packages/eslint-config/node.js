import { config as baseConfig } from "./base.js";

/**
 * ESLint configuration for Node.js services (api, worker).
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...baseConfig,
  {
    rules: {
      "no-console": "off",
    },
  },
];
