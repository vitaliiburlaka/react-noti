import js from '@eslint/js'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReact from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import globals from 'globals'

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
  ...tseslint.configs.recommended.map((c) => ({
    ...c,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs}'],
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
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
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
    files: [
      '**/*.test.{ts,tsx,js,jsx}',
      'src/setupTests.ts',
      'src/__mocks__/**',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]
