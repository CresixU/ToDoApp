module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ["<rootDir>/tests/**/*.test.(js|jsx|ts|tsx)"]
  };