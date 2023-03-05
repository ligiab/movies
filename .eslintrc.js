/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
   root: true,
   extends: [
      'plugin:vue/vue3-recommended',
      'eslint:recommended',
      '@vue/eslint-config-prettier/skip-formatting',
   ],
   parserOptions: {
      ecmaVersion: 'latest',
   },
   rules: {
      'object-curly-spacing': [ 'error', 'always' ],
      'array-bracket-spacing': [ 'error', 'always' ],
      'computed-property-spacing': [ 'error', 'always' ],
      indent: [ 'error', 3 ],
      quotes: [ 2, 'single', { 'avoidEscape': true } ]
   },
};
