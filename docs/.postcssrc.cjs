// docs/.postcssrc.cjs

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-prefix-selector': {
            prefix: ':not(:where(.vitepress-demo-preview-preview *))',
            includeFiles: [/vp-doc\.css/],
            transform(prefix, selector) {
                return selector + prefix;
            },
        },
    },
};
