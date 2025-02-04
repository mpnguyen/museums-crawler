module.exports = {
  "env": {
      "es6": true,
      "node": true
  },
  "extends": ["eslint:recommended", "plugin:import/errors"],
  "parserOptions": {
      "sourceType": "module",
      "ecmaVersion": 2017,
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true
      }
  },
  "rules": {
      "indent": [
          "error",
          2,
          { "SwitchCase": 1 }
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "comma-dangle": [
          2,
          "always-multiline"
      ],
      "prefer-const": 2,
      "import/imports-first": 2,
      "import/newline-after-import": 2,
      "import/no-dynamic-require": 2,
      "import/no-unresolved": 2,
  }
};