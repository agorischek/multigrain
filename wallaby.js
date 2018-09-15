module.exports = () => {
  return {
    files: [
      'lib/**/*.js'
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
