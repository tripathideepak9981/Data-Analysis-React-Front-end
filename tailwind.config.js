const scrollbarHide = require('tailwind-scrollbar-hide');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        header: ['1.5rem', { lineHeight: '2rem' }], // ~24px
        subheader: ['1.375rem', { lineHeight: '1.875rem' }], // ~22px
        label: ['1rem', { lineHeight: '1.5rem' }], // ~16px
        message: ['0.875rem', { lineHeight: '1.25rem' }], // ~14px
        query: ['0.8125rem', { lineHeight: '1.125rem' }], // ~13px
      },
      animation: {
        gradientMove: 'gradientMove 1.2s linear infinite',
        bounceSlow: 'bounceSlow 1s infinite ease-in-out', 
        
        blink: 'blink 1.5s ease-in-out infinite',
        rotate4: 'rotate4 1.4s linear infinite',
        dash4: 'dash4 1.4s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 1s infinite ease-in-out',
        barUp1: 'barUp1 4s infinite',
        barUp2: 'barUp2 4s infinite',
        barUp3: 'barUp3 4s infinite',
        barUp4: 'barUp4 4s infinite',
        barUp5: 'barUp5 4s infinite',
        ballMove: 'ballMove 4s infinite',
      },
      keyframes: {
        gradientMove: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.5rem)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        rotate4: {
          '100%': { transform: 'rotate(360deg)' },
        },
        dash4: {
          '0%': { strokeDasharray: '1, 200', strokeDashoffset: '0' },
          '50%': { strokeDasharray: '90, 150', strokeDashoffset: '-40px' },
          '100%': { strokeDasharray: '90, 150', strokeDashoffset: '-120px' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.5rem)' },
        },
        barUp1: {
          '0%, 40%': { transform: 'scale(1, 0.2)' },
          '50%, 90%': { transform: 'scale(1, 1)' },
          '100%': { transform: 'scale(1, 0.2)' },
        },
        barUp2: {
          '0%, 40%': { transform: 'scale(1, 0.4)' },
          '50%, 90%': { transform: 'scale(1, 0.8)' },
          '100%': { transform: 'scale(1, 0.4)' },
        },
        barUp3: {
          '0%, 100%': { transform: 'scale(1, 0.6)' },
        },
        barUp4: {
          '0%, 40%': { transform: 'scale(1, 0.8)' },
          '50%, 90%': { transform: 'scale(1, 0.4)' },
          '100%': { transform: 'scale(1, 0.8)' },
        },
        barUp5: {
          '0%, 40%': { transform: 'scale(1, 1)' },
          '50%, 90%': { transform: 'scale(1, 0.2)' },
          '100%': { transform: 'scale(1, 1)' },
        },
        ballMove: {
          '0%': { transform: 'translate(0, 0)' },
          '5%': { transform: 'translate(8px, -14px)' },
          '10%': { transform: 'translate(15px, -10px)' },
          '17%': { transform: 'translate(23px, -24px)' },
          '20%': { transform: 'translate(30px, -20px)' },
          '27%': { transform: 'translate(38px, -34px)' },
          '30%': { transform: 'translate(45px, -30px)' },
          '37%': { transform: 'translate(53px, -44px)' },
          '40%': { transform: 'translate(60px, -40px)' },
          '50%': { transform: 'translate(60px, 0)' },
          '57%': { transform: 'translate(53px, -14px)' },
          '60%': { transform: 'translate(45px, -10px)' },
          '67%': { transform: 'translate(37px, -24px)' },
          '70%': { transform: 'translate(30px, -20px)' },
          '77%': { transform: 'translate(22px, -34px)' },
          '80%': { transform: 'translate(15px, -30px)' },
          '87%': { transform: 'translate(7px, -44px)' },
          '90%': { transform: 'translate(0, -40px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [scrollbarHide],
};
