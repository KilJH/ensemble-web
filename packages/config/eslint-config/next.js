module.exports = {
  extends: ['next/core-web-vitals', './index.js'],
  plugins: ['boundaries'],
  settings: {
    'boundaries/include': ['src/**/*'],
    'boundaries/elements': [
      { type: 'app', pattern: 'src/app/**/*' },
      { type: 'widgets', pattern: 'src/widgets/**/*' },
      { type: 'features', pattern: 'src/features/**/*' },
      { type: 'entities', pattern: 'src/entities/**/*' },
      { type: 'shared', pattern: 'src/shared/**/*' },
    ],
  },
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
    // FSD layer import rules
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          // app can import from all layers
          { from: 'app', allow: ['widgets', 'features', 'entities', 'shared'] },
          // widgets can import from features, entities, shared
          { from: 'widgets', allow: ['features', 'entities', 'shared'] },
          // features can import from entities, shared
          { from: 'features', allow: ['entities', 'shared'] },
          // entities can import from shared only
          { from: 'entities', allow: ['shared'] },
          // shared can import from shared only
          { from: 'shared', allow: ['shared'] },
        ],
      },
    ],
  },
};
