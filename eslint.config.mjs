import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReact from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'
import path from 'path'
import globals from 'globals'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  {
    ignores: [
      'node_modules/**',
      'build/**',
      'dist/**',
      'coverage/**',
      'fixtures/**',
      'examples/build/**',
    ],
  },
  js.configs.recommended,
  ...compat.extends('airbnb', 'plugin:prettier/recommended', 'prettier'),
  ...tseslint.configs.recommended.map((c) => ({
    ...c,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
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
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'react/require-default-props': 'off',
      'react/state-in-constructor': [1, 'never'],
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
    },
  },
  {
    files: ['**/*.test.{ts,tsx,js,jsx}', 'src/setupTests.ts', 'src/__mocks__/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]
