export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      TEST_DB_PORT: number;
      TEST_DB_USER: string;
      TEST_DB_HOST: string;
      TEST_DB_NAME: string;
      TEST_DB_PASSWORD: string;
      TEST_ENV: string;
      TEST_ERROR: string;
      SESSION_SECRET: string;
      AUTH_SECRET: string;
      BASE_URL: string;
      CLIENT_ID: string;
      ISSUER: string;
      API_CLIENT_ID: string;
      API_CLIENT_SECRET: string;
      API_TOKEN: string | null
      HOST_URL: string;
      NODE_ENV: 'development' | 'production';
      PORT: number
    }
  }
}