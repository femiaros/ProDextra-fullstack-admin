/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primaryDark: '#ffffff',
        primary: "#000000",

        bgDarkPrimary: "#292e43", 
        bgDarkSecondary: "#e3e1e120",
        bgPrimary: "#fefefe", 
        bgSecondary: "#faf9f9",
        
        bgDarkActiveNav: "#ffffff4b",
        bgActiveNav: "#0000009b",

        statGreen: "#3A9E5E",
        statRed: "#D55D61",

        bgStatGreen: "#C4FADA",
        bgStatRed: "#FED2CF",
    
        altOne: '#F4CF9B',
        altTwo: '#8E6D76'
      },
      boxShadow: {
        cardDark: "0px 0px 5px #ffffff4b",
        card: "0px 0px 5px rgba(0, 0, 0, 0.5)",
      },
      screens: {
        xs: "450px",
        bpi: "1090px",
        bpii: "860px",
        bpiii: "690px",
        bpiiii: "580px"
      }
    },
  },
  plugins: [],
}



