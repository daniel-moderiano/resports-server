import { Pool } from "pg";
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

it("completes", async () => {
  pool.query("SELECT NOW()", (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log(res.rows);
    }
    pool.end();
  });
  expect(true).toBe(true);
});
