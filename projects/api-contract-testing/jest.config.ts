import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testTimeout: 30000,
    roots: ['<rootDir>/tests'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    reporters: [
        'default',
        ['jest-html-reporter', {
            pageTitle: 'API Test Report',
            outputPath: 'reports/test-report.html',
            includeFailureMsg: true,
            styleOverridePath: './report-style.css'
        }]
    ]
};

export default config;
