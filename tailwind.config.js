/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#14122A',
          deep: '#0B0A1C',
          mid: '#1E1B3A',
        },
        wood: {
          DEFAULT: '#5A241F',
          dark: '#3E1815',
        },
        brass: {
          DEFAULT: '#C89B3C',
          soft: '#E3C580',
        },
        ivory: {
          DEFAULT: '#F3E8D8',
          dim: '#C9BCA4',
        },
        teal: {
          DEFAULT: '#2F5D58',
          light: '#3E7B74',
        },
      },
      fontFamily: {
        display: ['"Yatra One"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
};
