module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./pages/**/*.{html,js}",
        "./components/**/*.{html,js}",
    ],
    theme: {
        extend: {
            colors: {
                silver: "#c0c0c0",
                inputGray: "#d0d0d0",
            },
            width: {
                "90vw": "90vw",
            },
        },
    },
};
