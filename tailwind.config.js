module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // darkMode: 'class',
  theme: {

    extend: {
      colors: {
        primary: {
          DEFAULT: '#fe2c55'
        },
      },
      textColor: {
        primary: {
          light: '#ffff',
          DEFAULT: '#fe2c55',
          dark: '#04111d',
        },
        secondary: {
          light: '#e5e8eb',
          dark: '#353840',
        },
        muted: {
          light: '#8a939b',
          dark: '#707a83',
        },
      },
  
      backgroundColor: {
        primary: {
          dark: '#000',
          DEFAULT: '#fe2c55',
          light: '#fff',
        },
        secondary: {
          dark: '#181818',
          DEFAULT: 'rgba(254, 44, 85, 0.05)',
          light: '#f3f4f6',
        },
      },
  
      screens: {
        sm: '600px',
        md: '786px',
        lg: '1024px',
        xl: '1280px',
      },
      width: {
        1600: '1600px',
        400: '400px',
        450: '450px',
        210: '210px',
        550: '550px',
        260: '260px',
        650: '650px',
      },
      height: {
        600: '600px',
        280: '280px',
        900: '900px',
        458: '458px',
      },
      top: {
        ' 50%': '50%',
      },

    

      height: {
        '88vh': '88vh',
      },
      backgroundImage: {
        'blurred-img':
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaaJ7s4lqcBF4IDROVPzrlL5fexcwRmDlnuEYQenWTt1DejFY5kmYDref2a0Hp2eE4aw&usqp=CAU')",
      },
    },
  },
  plugins: [],
};