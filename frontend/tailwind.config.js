import tailwindScrollbarHide from "tailwind-scrollbar-hide"
/**  @type {import('tailwindcss').config} */
export default {
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {}
},
plugins: [tailwindScrollbarHide]
}