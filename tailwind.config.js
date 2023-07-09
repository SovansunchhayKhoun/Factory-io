/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./resources/**/*.jsx",
        './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                'Poppins': ['Poppins']
            },
            colors: {
                "dark-purple": "#081A51",
                "light-white": "rgba(255,255,255,0.17)",
                tealActive: "#59C3CB",
                tealHover: "#00727A",
                tealBase: "#048D95",
                redBase: "#B21317",
                redActive: "#D93F33",
                redHover: "#8A0000",
                blueBase: "#18264B",
                blueActive: "#2D335B",
                blueHover: "#00082E",
                blackFactory: "#1D1D1F",
                whiteFactory: "#F5F5F7",
                grayFactory: "#989A9C",
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
    ],
}
