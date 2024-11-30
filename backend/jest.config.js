// Setup for jest for the backend
module.exports = {
    testEnvironment: 'node', // Backend
    setupFilesAfterEnv: ['jest-extended'],
    moduleDirectories: ['node_modules', '<rootDir>/'],
  };
  