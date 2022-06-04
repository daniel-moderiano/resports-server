export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      NODE_ENV: 'development' | 'production';
      PORT: number
    }
  }
}