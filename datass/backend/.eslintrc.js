module.exports = {
  env: {
    node: true,
  },
  globals: {
    Promise: false,
  },
  extends: [
    'eslint:recommended',
    '../.eslintrc-rules.js',
  ],
};
