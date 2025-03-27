import eslint   from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
   eslint.configs.recommended,
   ...tseslint.configs.strict,
   { ignores: ['**/*.js', "mongo/**/*.js","mongo/**/*.data", "mongo/**/"] },
   {
      rules: {
         '@typescript-eslint/no-non-null-assertion': 'off',
      },
   },
];