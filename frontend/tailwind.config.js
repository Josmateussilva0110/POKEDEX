/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // escaneia o index principal
    "./src/**/*.{js,ts,jsx,tsx}" // escaneia todos os arquivos dentro de src
  ],
  theme: {
    extend: {}, // aqui você pode estender cores, fontes, espaçamentos, etc.
  },
  plugins: [], // aqui você adiciona plugins Tailwind se precisar
}
