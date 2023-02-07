import { Pool } from "pg";
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

it("completes", async () => {
  let numRows: number = 0;
  const queryResult = await pool.query("SELECT NOW();");
  numRows = queryResult.rows.length;

  await pool.end();

  expect(numRows).toBe(1);
});
