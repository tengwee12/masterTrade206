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
                purple: '#7c15ff',
                inputGray: "#d0d0d0",
                brandPurple: '#440d88',
            },
            width: {
                "90vw": "90vw",
            },
            fontFamily: {
                poppinsExtrabold: ['Poppins_800ExtraBold'],
            },
        },
    },
};
