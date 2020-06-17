const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
}
