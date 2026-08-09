/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: "#F9C7DB",
          button: "#EF8FB1",
          text: "#4D2944",
          muted: "#8F7189",
          lavender: "#EAF0FC",
          blue: "#A9DDF3",
          green: "#BDEED8",
          yellow: "#F8E9A9",
          purple: "#DCCCF7",
        },
      },
    },
    fontFamily: {
      display: [
        '"Baloo 2"',
        '"Quicksand"',
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
      ],
      sans: [
        '"Quicksand"',
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
      ],
    },
  },
  plugins: [],
}

