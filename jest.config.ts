export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        'tests/(.*)': '<rootDir>/__tests__/$1',
        "^.+\\.(css|less|scss)$": "babel-jest"
    },
}