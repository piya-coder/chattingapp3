/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#4EAC6D',
        "black" : '#495057',
        "white" : '#FFFFFF',
      },
      spacing: {
        'input': '370px',
      }
    },
    fontWeight: {     
      medium: '500',
    },
    fontSize: {
    base : '1rem',
    small: "14px",
    }
  },
  plugins: [],
}
