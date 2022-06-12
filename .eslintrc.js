module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'import/no-unresolved': 'off',
    'unicorn/prefer-module': 'off',
    'import/named': 0,
    'import/no-named-as-default': 0,
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-object-from-entries': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: ['*spec*'],
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          props: {
            properties: false,
          },
          i: {
            index: false,
          },
          e: {
            event: false,
            error: false,
          },
          ref: {
            reference: false,
          },
          params: {
            parameters: false,
          },
        },
      },
    ],
  },
};
