module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['plugin:@angular-eslint/recommended'],
  rules: {
    // ORIGINAL tslint.json -> "directive-selector": [true, "attribute", "app", "camelCase"],
    '@angular-eslint/directive-selector': [
      'error',
      { type: 'attribute', prefix: 'app', style: 'camelCase' },
    ],
    // ORIGINAL tslint.json -> "component-selector": [true, "element", "app", "kebab-case"],
    '@angular-eslint/component-selector': [
      'error',
      { type: 'element', prefix: 'app', style: 'kebab-case' },
    ],
  },
  overrides: [
    /**
     * This extra piece of configuration is only necessary if you make use of inline
     * templates within Component metadata, e.g.:
     */
    {
      files: ['*.component.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: ['@angular-eslint/template'],
      processor: '@angular-eslint/template/extract-inline-html',
    },
    // Custom rules for TypeScript
    {
      files: ['*.ts'],
      extends: [
        'airbnb-typescript/base',
        'prettier/@typescript-eslint',
        // 'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'lines-between-class-members': 'off',
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
        'key-spacing': [
          'error',
          {
            align: {
              beforeColon: true,
              afterColon: true,
              on: 'colon',
            },
            multiLine: {
              beforeColon: false,
              afterColon: true,
            },
          },
        ],
        'no-multi-spaces': 'off',
      },
    },
    // Configuration for unit and e2e spec files
    {
      files: ['*.spec.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['projects/**/*.spec.ts', 'projects/**/*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: ['plugin:jasmine/recommended'],
      plugins: ['jasmine'],
      env: { jasmine: true },
    },
    {
      files: ['e2e/**/*.e2e-spec.ts', 'e2e/**/*.po.ts'],
      parserOptions: {
        project: './e2e/tsconfig.json',
      },
      extends: ['plugin:protractor/recommended'],
      plugins: ['protractor'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
};
