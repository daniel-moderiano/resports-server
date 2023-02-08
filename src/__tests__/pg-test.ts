import { getTestDatabase } from "../db";
import { initialiseDatabase } from "../db/initdb";

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
  let numRows = 0;
  const queryResult = await db.query(
    `SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'`
  );

  numRows = queryResult.rows.length;
  expect(numRows).toBe(1);
});
