/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './play/*.vue', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'filter-label': '#606266',
            },
        },
    },
    plugins: [],
};
