// This the Redwood root jest config
// Each side, e.g. ./web/ and ./api/ has specific config that references this root
// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

// jest.config.js
module.exports = {
  // Other Jest settings...
  transformIgnorePatterns: [
    "node_modules/(?!(simplewebauthn/browser)/)"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // or "ts-jest" if you're using TypeScript
  },
};

