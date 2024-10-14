import pluginJs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';


export default [

  {
    ignores: [""],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  jestPlugin.configs.recommended
];