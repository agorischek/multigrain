module.exports = () => {
  return {
    files: [
      'index.js'
    ],
    tests: [
      'test/**/*.js'
    ],
    testFramework: "mocha",
    env: {
      type: 'node'
    },
    debug: true
  };
};
