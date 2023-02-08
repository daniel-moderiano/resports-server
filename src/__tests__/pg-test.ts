import { getTestDatabase } from "../db";
import { initialiseDatabase } from "../db/initdb";

console.log(process.env);

jest.setTimeout(20000);
jest.resetModules();

const db = getTestDatabase();

// Ensure all tables are first dropped before re-creating them anew in the test DB
beforeAll(async () => {
  await initialiseDatabase(db);
});

// Close the pool on completion
afterAll(async () => {
  await db.end();
});

it("completes", async () => {
  let numRows: number = 0;
  const queryResult = await db.query(
    `SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'`
  );

  numRows = queryResult.rows.length;
  expect(numRows).toBe(1);
});
