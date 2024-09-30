/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,tsx}",
        "./src/components/*.{html,tsx}",
        "./src/views/*.{html,tsx}",
    ],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1158px",
            xl: "1536px",
        },
        extend: {
            colors: {
                mainBg: "rgb(var(--mainBg))",
                secMainBg: "rgb(var(--secMainBg))",
            },
        },
    },
};
