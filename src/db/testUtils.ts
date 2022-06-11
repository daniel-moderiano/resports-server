import getDb from ".";

export const createTable = async function (tableName: string) {
  const db = getDb();

  return db.query(`CREATE TABLE IF NOT EXISTS ${tableName} (id SERIAL PRIMARY KEY, name VARCHAR(40) not null, price NUMERIC(10, 2));`)
}