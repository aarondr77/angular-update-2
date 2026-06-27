module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/cypress/', '/dist/', '/src/test.ts'],
  collectCoverageFrom: [
    'src/app/store/**/*.ts',
    'src/app/core/services/**/*.ts',
    'src/app/shared/pipes/**/*.ts',
    '!src/app/store/**/*.module.ts',
    '!src/app/notifications/notification-batch.service.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 55,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '@bofa/legacy-trend-widget': '<rootDir>/packages/legacy-trend-widget/src/public-api.ts',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
