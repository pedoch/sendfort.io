/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        largeTablet: { max: "1024px" },
        // => @media (max-width: 1024px) { ... }

        tablet: { max: "780px" },
        // => @media (max-width: 780px) { ... }

        smallTablet: { max: "600px" },
        // => @media (max-width: 600px) { ... }

        phone: { max: "500px" },
        // => @media (max-width: 500px) { ... }

        smallPhone: { max: "375px" },
        // => @media (max-width: 350px) { ... }
      },
      colors: {
        primary: "#0B9B36",
        secondary: "#FC4F43",
      },
    },
  },
  plugins: [],
};
