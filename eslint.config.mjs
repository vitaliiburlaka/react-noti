import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import globals from 'globals';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...compat.extends(
    'airbnb',
    'plugin:prettier/recommended',
    'prettier'
  ),
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      prettier: pluginPrettier,
      'react-hooks': pluginReactHooks,
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
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
      'react/state-in-constructor': [1, 'never'],
    },
  },
];
