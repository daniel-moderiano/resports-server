import { getDevelopmentDatabase, getProductionDatabase } from ".";

const db =
  process.env.NODE_ENV === "development"
    ? getDevelopmentDatabase()
    : getProductionDatabase();

// GENERALISED FUNCTIONS
export const selectAllFromTable = async function (tableName: string) {
  return db.query(`SELECT * FROM ${tableName}`);
};

export const dropTable = async function (tableName: string) {
  await db.query(`DROP TABLE IF EXISTS ${tableName};`);
};
