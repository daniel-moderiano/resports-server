import getDb from ".";
import { Channel } from "../types/databaseTypes";

// CHANNELS TABLE FUNCTIONS
export const selectChannel = async (channelId: string) => {
  const db = getDb();
  return db.query('SELECT * FROM channels WHERE channel_id=$1', [channelId])
}

export const insertChannel = async (channel: Channel) => {
  const db = getDb();
  return db.query('INSERT INTO channels (channel_id, channel_name) VALUES ($1, $2) RETURNING *', [channel.channelId, channel.channelName])
}

// With many users, channel db conflicts are likely. Upsert is preferred here, as video platforms allow channel name changes. This will allow the channel entries to better reflect name changes on the platform
export const upsertChannel = async (channel: Channel) => {
  const db = getDb();
  return db.query('INSERT INTO channels (channel_id, channel_name) VALUES ($1, $2) ON CONFLICT (channel_id) DO UPDATE SET channel_name = $2 RETURNING *', [channel.channelId, channel.channelName])
}

export const deleteChannel = async (channelId: string) => {
  const db = getDb();
  return db.query('DELETE FROM channels WHERE channel_id=$1', [channelId])
}

export const updateChannel = async (updatedChannel: Channel) => {
  const db = getDb();
  return db.query('UPDATE channels SET channel_name=$2 WHERE channel_id=$1 RETURNING *', [updatedChannel.channelId, updatedChannel.channelName])
}