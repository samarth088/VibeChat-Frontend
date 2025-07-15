module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vibe-blue': '#3B82F6',
        'vibe-green': '#10B981',
      },
      boxShadow: {
        'chat': '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
