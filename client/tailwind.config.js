module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            keyframes: {
                "slide-in": {
                    "0%": {
                        transform: "translate-y-full",
                        opacity: "0",
                    },
                    "100%": {
                        transform: "translate-y-0",
                        opacity: "1",
                    },
                },
                "slide-out": {
                    "0%": {
                        transform: "translate-y-0",
                        opacity: "1",
                    },
                    "100%": {
                        transform: "translate-y-full",
                        opacity: "0",
                    },
                },
            },
            animation: {
                "slide-in": "slide-in 0.4s ease-out",
                "slide-out": "slide-out 0.4s ease-out",
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
