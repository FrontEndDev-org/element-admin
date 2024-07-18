module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-prettier',
    ],
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind'],
            },
        ],
        'no-empty-source': null,
        'selector-class-pattern': null,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
    },
};
