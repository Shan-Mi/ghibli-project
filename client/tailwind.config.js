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
        fullHeight: "calc(-240px + 100vh)",
      },
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
