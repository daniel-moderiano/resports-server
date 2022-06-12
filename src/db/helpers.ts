import getDb from ".";

interface User {
  userId: string;
  userEmail: string;
}

interface Channel {
  channelId: string;
  channelName: string;
}

interface Subscription {
  subscriptionId?: number;
  channelId: string;
  userId: string;
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
// Although in the database the ID is a numeric type, subscription ID will frequently be in the form of a string elsewhere. Whether the query is made using string or int input does not change the outcome, hence both types are accepted
export const selectSubscription = async (subscriptionId: number | string) => {
  const db = getDb();
  return db.query('SELECT * FROM subscriptions WHERE subscription_id=$1', [subscriptionId])
}

export const insertSubscription = async (subscription: Subscription) => {
  const db = getDb();
  return db.query('INSERT INTO subscriptions (user_id, channel_id) VALUES ($1, $2) RETURNING *', [
    subscription.userId,
    subscription.channelId
  ])
}

export const deleteSubscription = async (subscriptionId: number) => {
  const db = getDb();
  return db.query('DELETE FROM subscriptions WHERE subscription_id=$1', [subscriptionId])
}

export const updateSubscription = async (updatedSubscription: Subscription) => {
  const db = getDb();
  return db.query('UPDATE subscriptions SET user_id=$2, channel_id=$3 WHERE subscription_id=$1 RETURNING *', [
    updatedSubscription.subscriptionId,
    updatedSubscription.userId,
    updatedSubscription.channelId
  ]);
}