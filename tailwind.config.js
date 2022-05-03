module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                baloo: ['"Baloo Thambi 2"', 'cursive'],
                noto: ['"Noto Sans TC"', 'sans-serif'],
            },
            colors: {
                mybg: '#FFD370',
                secondary: '#2563EB',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')({ strategy: 'class' })],
};
