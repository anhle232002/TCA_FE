module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#3db16b",
                "primary-focus": "#009d69",
                dark__primary: "#",
                secondary: "#ffffff",
                dark__secondary: "#464852",
                "secondary-content": "#ebebeb",
                "dark__secondary-content": "#272935",
                "secondary-focus": "#cdcdcd",
                accent: "#212529",
                "accent-content": "#aac9ee",
                dark__accent: "#d1d1d4",
                "dark__accent-content": "#909197",
            },
        },
    },
    plugins: [],
};
