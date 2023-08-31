import dotenv from 'dotenv'
dotenv.config()

export default {
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|scss|sss|styl)$': 'jest-css-modules',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  transform: {
   '\\.(svg)$': '<rootDir>/src/test/__mocks__/svgTransform.cjs',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
