const config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brandGray: '#323232',
      },
      maxWidth: {
        container: "1280px",
      },
      animation: {
        meteor: 'meteor 5s linear infinite',
        marquee: 'marquee var(--duration) linear infinite',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' }
        }
      }
    },
  },
  plugins: [],
}

export default config; 