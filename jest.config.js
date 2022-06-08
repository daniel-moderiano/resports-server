module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testPathIgnorePatterns: ['dist', 'src/__tests__/db-setup.ts']
};