module.exports = {
    '!(*auto-imports.d.ts).{[tj]s,[tj]sx,[cm]js}': [
        'prettier --write',
        'eslint --cache --fix',
    ],
    '*.vue': ['prettier --write', 'stylelint --fix', 'eslint --cache --fix'],
    '*.{css,scss}': ['stylelint --fix', 'prettier --write'],
    '!(*.eslintrc-auto-import).json': ['prettier --write'],
    '*.html': ['prettier --write'],
};
