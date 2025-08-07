/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript rules
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    // General JS rules
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-empty': 'off',
    'react/react-in-jsx-scope': 'off', // not needed for Next.js

    // Optional: disable all prop-types checks (since you're using TS)
    'react/prop-types': 'off',
  },
};
