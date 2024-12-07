/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter_400Regular', 'sans-serif'],
        'inter-bold': ['Inter_700Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}