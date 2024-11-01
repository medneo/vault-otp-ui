module.exports = {
    testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?|mjs?)$",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.mjs$": "babel-jest",
    },
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
    moduleFileExtensions: ["js", "jsx", "mjs"]
  }