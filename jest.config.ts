import type { Config } from 'jest';

  const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',  // ✅ Needed for DOM-based testing
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // ✅ Points to jest setup file
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],  // ✅ Support TypeScript & JavaScript
    roots: ['<rootDir>/src'], // ✅ Tells Jest to look inside `src/`
    transformIgnorePatterns: [
      'node_modules/(?!(lucide-react|framer-motion)/)' // ✅ Ensure Jest transpiles `lucide-react` & `framer-motion`
    ],
    transform: {
      "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }], // ✅ Use tsconfig.json
    },

  // ✅ Add moduleNameMapper to handle assets and styles
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy'
  }
  };
  
  export default config;
  


