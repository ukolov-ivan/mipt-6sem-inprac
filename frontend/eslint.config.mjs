import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';
import pluginReact from 'eslint-plugin-react';


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
  // {
  // plugins: {
  //   react: pluginReact,
  //   jest: jest
  // },
  // },
  // {
  //   plugins: { jest },
  //   rules: {
  //     ...jest.configs.recommended.rules,
  //   },
  // },
  // {
  //   languageOptions: { globals: { ...globals.browser, ...globals.jest, } }
  // },
  // "plugins" : [pluginJs, pluginReact, jest],
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  // jest.configs.recommended,
  {
    files: ['tests/**'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
];