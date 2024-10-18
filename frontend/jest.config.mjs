/** @type {import('jest').Config} */
export default {
    // verbose: true,
    roots: ['<rootDir>/src'],
    // preset: 'ts-jest',
    // preset: "react-native",
    testEnvironment: 'node',
    transform: {
        'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
    resetMocks: false,
    maxWorkers: 1,
    // moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/public/'],
    // testEnvironment: 'jsdom',
    testMatch: [
        // "<rootDir>/src/**/__tests__/**/*.(ts|js)?(x)",

        '<rootDir>/src/**/__tests__/**/*.jsx',
        '<rootDir>/src/**/?(*.)(spec|test).jsx',
        '/home/ivan/MyBeatifulRepos/mipt/6sem/inprac/backup/frontend/src/pages/tests/RegisterPage.test.jsx',
    ],
    setupFilesAfterEnv: ['./src/setupTests.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};
