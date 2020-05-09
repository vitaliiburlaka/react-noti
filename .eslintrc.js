module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['prettier', 'react-hooks'],
  rules: {
    'no-console': 'off',
    'arrow-parens': ['error', 'always'],
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': [
      1,
      {
        devDependencies: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/require-default-props': 'off',
    'react/state-in-constructor': [1, 'never']
  },
}
