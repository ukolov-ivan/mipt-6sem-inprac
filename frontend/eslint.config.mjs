import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";



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
  {languageOptions: { globals: globals.browser }},
  
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];