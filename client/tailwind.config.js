module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            keyframes: {
                genie: {
                    "0%": {
                        transform: "translate-y-full",
                        opacity: "0",
                    },
                    "100%": {
                        transform: "translate-y-0",
                        opacity: "1",
                    },
                },
            },
            animation: {
                genie: "genie 0.4s ease-out",
            },
        },
    },
    variants: {
        extend: {
            opacity: ["disabled"],
        },
    },
    plugins: [],
};
