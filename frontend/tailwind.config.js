/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        'xs': '320px',  // Example: For screens smaller than 320px (Extra small devices)
        'sm': '640px',  // Example: For screens larger than 640px (Smartphones)
        'md': '768px',  // Example: For screens larger than 768px (Tablets)
        'lg': '1024px', // Example: For screens larger than 1024px (Desktops)
        'xl': '1280px', // Example: For screens larger than 1280px (Large desktops)
        '2xl': '1536px' // Example: For screens larger than 1536px (Extra large desktops)
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms')],
}

