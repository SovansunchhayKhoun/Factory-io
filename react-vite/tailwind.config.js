/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
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
    plugins: [],
}
