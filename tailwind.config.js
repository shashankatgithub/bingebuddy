/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary-button': "#545B5E",       // Example primary color
        secondary: "#ED8936",     // Example secondary color
        accent: "#DD6B20",        // Accent color
        youtube: "#FF0000",       // YouTube Red
        customGray: "#6B7280",    // Custom gray color
      },
      fontFamily: {
        inter: ['Inter_400Regular', 'sans-serif'],
        'inter-bold': ['Inter_700Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}