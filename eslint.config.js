import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Global ignores (replacement for .eslintignore)
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'android/**',
      'ios/**',
      'dist/**',
      'web-build/**',
      'babel.config.js',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React / Expo
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // JS QoL
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',

      // Formatting
      'prettier/prettier': 'warn',
    },
    env: {
      es2021: true,
      node: true, // 👈 this is the key line
    },
  },
];
