module.exports = {
    root: true,
    extends: 'airbnb',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },

    env: {
        browser: true
    },

    // add your custom rules here
    'rules': {
        'import/no-unresolved': 0,
        'global-require': 0,
        'arrow-spacing': 0,
        'no-use-before-define': 0,
        'no-unused-vars': 0,
        'indent': [ 'error', 4 ],
        'computed-property-spacing': ['error', 'always'],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
