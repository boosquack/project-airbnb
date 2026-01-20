/** @type {import("prettier").Config} */
const config = {
  bracketSpacing: true,
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 80,
  quoteProps: 'consistent',
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
};

module.exports = config;
