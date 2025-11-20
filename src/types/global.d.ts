/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    // Add other environment variables here as needed
    CONTACT_EMAIL: string;
    EMAIL_PASSWORD: string;
  }
}

// This makes the file a module
export {};
