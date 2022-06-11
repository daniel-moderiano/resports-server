import getDb from ".";

interface User {
  userId: string;
  userEmail: string;
}

interface Channel {
  channelId: string;
  channelName: string;
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
export const selectUser = async (userId: string) => {
  const db = getDb();
  return db.query('SELECT * FROM users WHERE user_id=$1', [userId])
}

export const insertUser = async (user: User) => {
  const db = getDb();
  return db.query('INSERT INTO users (user_id, user_email) VALUES ($1, $2) RETURNING *', [user.userId, user.userEmail])
}

export const deleteUser = async (userId: string) => {
  const db = getDb();
  return db.query('DELETE FROM users WHERE user_id=$1', [userId])
}

export const updateUser = async (updatedUser: User) => {
  const db = getDb();
  return db.query('UPDATE users SET user_email=$2 WHERE user_id=$1 RETURNING *', [updatedUser.userId, updatedUser.userEmail])
}


// CHANNELS TABLE FUNCTIONS
export const selectChannel = async (channelId: string) => {
  const db = getDb();
  return db.query('SELECT * FROM channels WHERE channel_id=$1', [channelId])
}

export const insertChannel = async (channel: Channel) => {
  const db = getDb();
  return db.query('INSERT INTO channels (channel_id, channel_name) VALUES ($1, $2) RETURNING *', [channel.channelId, channel.channelName])
}

export const deleteChannel = async (channelId: string) => {
  const db = getDb();
  return db.query('DELETE FROM channels WHERE channel_id=$1', [channelId])
}

export const updateChannel = async (updatedChannel: Channel) => {
  const db = getDb();
  return db.query('UPDATE channels SET channel_name=$2 WHERE channel_id=$1 RETURNING *', [updatedChannel.channelId, updatedChannel.channelName])
}


// SUBSCRIPTIONS TABLE FUNCTIONS
