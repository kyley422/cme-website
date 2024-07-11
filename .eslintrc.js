
module.exports = {

  extends: [
    'next/core-web-vitals',
    "eslint:recommended",
  ],
  plugins: [
    'sort-imports-es6-autofix',
    'sort-keys-fix',
    'sort-destructure-keys',
  ],
  rules: {
    // Disabling until we find a good fix for the way nextjs does module importing
    'import/no-unresolved': ['off'],
    'import/order': 0,
    // We can disable this because we are using Next/Link
    'jsx-a11y/anchor-is-valid': 0,
    'no-use-before-define': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-no-useless-fragment': 0,
    'react/jsx-props-no-spreading': 0,
    'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: false }],
    'sort-imports-es6-autofix/sort-imports-es6': [2, {
      ignoreCase: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
    }],
    'sort-keys-fix/sort-keys-fix': 'error',
  }
}

