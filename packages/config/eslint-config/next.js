module.exports = {
  extends: ['next/core-web-vitals', './index.js'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
