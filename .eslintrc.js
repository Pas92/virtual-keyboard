module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 'off',
    'no-console': 'warn',
    'max-len': ['warn', { code: 160 }],
    indent: ['warn', 2, {
      SwitchCase: 1,
    }],
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', {
      props: false,
    }],
  },
  ignorePatterns: ['*config.js'],
};
