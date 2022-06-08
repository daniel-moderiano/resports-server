import getDb from ".";

export const createTable = async function (tableName: string) {
  const db = getDb();

  return db.query(`CREATE TABLE IF NOT EXISTS ${tableName} (id SERIAL PRIMARY KEY, name VARCHAR(40) not null, price NUMERIC(10, 2));`)
}

export const insert = async function (tableName: string, itemName: string, price: number) {
  const db = getDb();

  return db.query(`INSERT INTO ${tableName} (name, price) VALUES ('${itemName}', '${price}');`)
}

export const select = async function (tableName: string) {
  const db = getDb();

  return db.query(`SELECT * FROM ${tableName}`)
}

export const dropTable = async function (tableName: string) {
  const db = getDb();

  await db.query(`DROP TABLE IF EXISTS ${tableName};`);
}