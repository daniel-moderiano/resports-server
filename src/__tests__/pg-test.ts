import { Pool } from "pg";
import { getTestDatabase } from "../db";

it("completes", async () => {
  const db = getTestDatabase();
  let numRows: number = 0;
  const queryResult = await db.query("SELECT NOW();");
  numRows = queryResult.rows.length;

  await db.end();

  expect(numRows).toBe(1);
});
