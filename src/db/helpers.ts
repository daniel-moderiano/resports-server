import getDb from ".";

interface User {
  userId: string;
  userEmail: string;
}

// GENERALISED FUNCTIONS
export const selectAllFromTable = async function (tableName: string) {
  const db = getDb();
  return db.query(`SELECT * FROM ${tableName}`)
};

export const dropTable = async function (tableName: string) {
  const db = getDb();
  await db.query(`DROP TABLE IF EXISTS ${tableName};`);
};


// USERS TABLE FUNCTIONS
export const insertUser = async (userId: string, userEmail: string) => {
  const db = getDb();
  return db.query('INSERT INTO users (user_id, user_email) VALUES ($1, $2) RETURNING *', [userId, userEmail])
}

export const deleteUser = async (userId: string) => {
  const db = getDb();
  return db.query('DELETE FROM users WHERE user_id=$1', [userId])
}

export const updateUser = async (userId: string, updatedUser: User) => {
  const db = getDb();
  return db.query('UPDATE users SET user_email=$2 WHERE user_id=$1 RETURNING *', [updatedUser.userId, updatedUser.userEmail])
}

export const selectUser = async (userId: string) => {
  const db = getDb();
  return db.query('SELECT * FROM users WHERE user_id=$1', [userId])
}

// CHANNELS TABLE FUNCTIONS

// SUBSCRIPTIONS TABLE FUNCTIONS
