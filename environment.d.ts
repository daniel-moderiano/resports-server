export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_TEST_NAME: string;
      DB_PASSWORD: string;
      UNHAPPY: string;
      NODE_ENV: 'development' | 'production';
      PORT: number
    }
  }
}