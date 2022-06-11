import getDb from ".";

// GENERALISED FUNCTIONS
export const selectAllFromTable = async function (tableName: string) {
  const db = getDb();

  return db.query(`SELECT * FROM ${tableName}`)
};

export const dropTable = async function (tableName: string) {
  const db = getDb();

  await db.query(`DROP TABLE IF EXISTS ${tableName};`);
};

export const createTable = async function (tableName: string) {
  const db = getDb();

  await db.query(`CREATE TABLE IF NOT EXISTS ${tableName};`);
};

