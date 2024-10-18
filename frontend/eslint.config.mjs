import jsPlugin from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        ...jsPlugin.configs.recommended,
        ...reactPlugin.configs.flat.recommended,
        ...prettierConfig,
        ...eslintPluginPrettierRecommended,
        rules: {
            'prettier/prettier': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['src/**/*'],
        languageOptions: {
            globals: { ...globals.browser },
        },
    },
    {
        files: ['**/tests/**/*.{js,mjs,cjs,jsx}', 'setupTests.js'],
        ...jestPlugin.configs['flat/recommended'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];
