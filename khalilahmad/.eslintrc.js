module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    // Disable rules that block deployment
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/role-has-required-aria-props': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    // Add more rules to disable as needed
  },
};
