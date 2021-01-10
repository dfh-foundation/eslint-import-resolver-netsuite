module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        // Use recommended rules from the @typescript-eslint/eslint-plugin
        "plugin:@typescript-eslint/recommended",
        // Disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        "prettier/@typescript-eslint",
        // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors.
        // Make sure this is always the last configuration in the extends array.
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    settings: {
    },
};
