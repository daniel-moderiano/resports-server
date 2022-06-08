import db from ".";

export const createTable = async function (tableName: string) {
  // Make sure db pool has active connection before runnin query
  await db.connect()

  return db.query(`CREATE TABLE IF NOT EXISTS ${tableName} (id SERIAL PRIMARY KEY, name VARCHAR(40) not null, price NUMERIC(10, 2));`)
}

export const insert = async function (tableName: string, itemName: string, price: number) {
  // Make sure db pool has active connection before runnin query
  await db.connect()

  return db.query(`INSERT INTO ${tableName} (name, price) VALUES ('${itemName}', '${price}');`)
}

export const select = async function (tableName: string) {
  await db.connect()

  return db.query(`SELECT * FROM ${tableName}`)
}

export const dropTable = async function (tableName: string) {
  await db.connect();

  await db.query(`DROP TABLE IF EXISTS ${tableName};`);
}