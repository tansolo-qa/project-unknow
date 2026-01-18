import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testTimeout: 30000,
    roots: ['<rootDir>/tests'],
};

export default config;
