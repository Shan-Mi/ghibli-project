module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Amaranth: ["Amaranth", "sans-serif"],
      },
      spacing: {
        res: "56.25%",
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        primary: "#deacab",
        dark: "#1d3e6b",
        light: "#a6a0a0",
      },
      height: {
        fullHeight: "calc(-276px + 100vh)",
      },
      minHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        fullHeight: "calc(-276px + 100vh)",
        full: "100%",
      },
      minWidth: {
        s: "360px",
      },
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/src/images/ghost.png')",
      }),
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover", "hover"],
      transform: ["hover", "focus"],
    },
  },
  plugins: [],
};
