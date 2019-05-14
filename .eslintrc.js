module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
  },
  "plugins": [
    "react", "import", "jsx-a11y",
  ],
  "rules": {
    "react/jsx-one-expression-per-line": "off",
  }
};
