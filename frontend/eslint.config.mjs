import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import tseslint from 'typescript-eslint';


export default [
    ...tseslint.configs.recommended,
    {
        plugins: { react: eslintPluginReact },
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
        settings: {
            react: { version: 'detect' },
        },
    },
    {
        ignores: ['src/components/ui','dist/', 'node_modules/', 'build/'],
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            react: eslintPluginReact,
            prettier: eslintPluginPrettier,
            "prefer-arrow-functions":preferArrowFunctions,
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'prettier/prettier': 'error',
            'react/react-in-jsx-scope': 'off',
            "no-var": "error",
            "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
            "prefer-const": "error",
            "object-shorthand": ["error", "always"],
            "prefer-arrow-functions/prefer-arrow-functions": [
                "warn",
                {
                    allowedNames: [],
                    allowNamedFunctions: false,
                    allowObjectProperties: false,
                    classPropertiesAllowed: false,
                    disallowPrototype: false,
                    returnStyle: "unchanged",
                    singleReturnOnly: false,
                },
            ],
        },
    },
    {
        ignores: ['node_modules', 'dist', 'build'],
    },
];
