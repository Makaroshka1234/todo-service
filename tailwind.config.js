/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {

                },
                customOrange: '#fca311',
                customGray: '#414141',
                customBorder: '#ffffff26'
            }
        },
    },
    plugins: [],
}
