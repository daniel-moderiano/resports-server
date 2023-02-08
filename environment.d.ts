export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROD_DB_PORT: number;
      PROD_DB_USER: string;
      PROD_DB_HOST: string;
      PROD_DB_NAME: string;
      PROD_DB_PASSWORD: string;
      DEV_DB_PORT: number;
      TEST_ENV: string;
      TEST_ERROR: string;
      DATABASE_URL: string | undefined;
      SESSION_SECRET: string;
      AUTH_SECRET: string;
      BASE_URL: string;
      CLIENT_ID: string;
      ISSUER: string;
      API_CLIENT_ID: string;
      API_CLIENT_SECRET: string;
      API_TOKEN: string | null;
      HOST_URL: string;
      NODE_ENV: "development" | "production";
      PORT: number;
    }
  }
}
