/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
    },
    plugins: {},
    rules: {},
  },
  { ignores: ['dist/*', 'node_modules/*', '.expo/*', '.figma/*'] },
];
