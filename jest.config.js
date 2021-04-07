module.exports = {
  collectCoverageFrom: [
    'src/**/*.+(js|jsx|ts|tsx)',
    '!src/**/*.styled.+(js|jsx|ts|tsx)',
    '!src/styles/*.+(js|jsx|ts|tsx)',
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/src/__mocks__/svgrMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
}
