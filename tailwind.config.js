// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this matches your file paths
    "./public/index.html", // Optional: include your public HTML if needed
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'], // Add the Quicksand font family here
      },
    },
  },
  plugins: [],
};
