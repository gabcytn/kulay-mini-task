/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#1b1f1d",
        surface: "#242a27",
        raised: "#2d3430",
        ink: "#e6e9e4",
        muted: "#8d978f",
        accent: "#8fb996",
        danger: "#d08a7e",
      },
      fontFamily: {
        display: ["Fraunces_600SemiBold"],
        sans: ["SourceSans3_400Regular"],
        "sans-semibold": ["SourceSans3_600SemiBold"],
        mono: ["JetBrainsMono_500Medium"],
      },
    },
  },
  plugins: [],
};
