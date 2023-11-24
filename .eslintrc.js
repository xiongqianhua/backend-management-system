/*
 * @Author: qianhua.xiong
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {},
  plugins: ['react-hooks', '@typescript-eslint'],
  rules: {
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  },
}  