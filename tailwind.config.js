/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1DA1F2',
        'secondary': '#14171A',
        'accent': '#657786',
        'background': '#F5F8FA',
        'text': '#14171A',
      },
    },
  },
  plugins: [],
}
// tailwind.config.js
// This file is used to configure Tailwind CSS in the project.