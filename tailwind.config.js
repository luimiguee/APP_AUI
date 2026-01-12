/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#50E3C2',
        neutral: {
          bg: '#F5F7FA',
          text: '#333333',
          subtext: '#AAAAAA',
        },
        alert: {
          warning: '#F5A623',
          danger: '#D0021B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'button': '8px',
      },
      spacing: {
        'section': '24px',
        'element': '12px',
      },
    },
  },
  plugins: [],
}


