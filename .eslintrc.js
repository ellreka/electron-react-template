module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'standard-with-typescript',
    'standard-react',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard'
  ],
  plugins: [
    'prettier',
    '@typescript-eslint',
    'simple-import-sort',
    'react-hooks'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/sort': [
      'error',
      {
        groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']]
      }
    ]
  }
}
