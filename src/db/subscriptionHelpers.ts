import getDb from ".";
import { Subscription } from "../types/databaseTypes";

// SUBSCRIPTIONS TABLE FUNCTIONS
// Although in the database the ID is a numeric type, subscription ID will frequently be in the form of a string elsewhere. Whether the query is made using string or int input does not change the outcome, hence both types are accepted
export const selectSubscription = async (subscriptionId: number | string) => {
  const db = getDb();
  return db.query("SELECT * FROM subscriptions WHERE subscription_id=$1", [
    subscriptionId,
  ]);
};

export const selectUserSubscriptions = async (userId: string) => {
  const db = getDb();
  return db.query("SELECT * FROM subscriptions WHERE user_id=$1", [userId]);
};

export const insertSubscription = async (subscription: Subscription) => {
  const db = getDb();
  return db.query(
    "INSERT INTO subscriptions (user_id, channel_id, platform) VALUES ($1, $2, $3) RETURNING *",
    [subscription.userId, subscription.channelId, subscription.platform]
  );
};

export const deleteSubscription = async (subscriptionId: number | string) => {
  const db = getDb();
  return db.query(
    "DELETE FROM subscriptions WHERE subscription_id=$1 RETURNING *",
    [subscriptionId]
  );
};

export const updateSubscription = async (updatedSubscription: Subscription) => {
  const db = getDb();
  return db.query(
    "UPDATE subscriptions SET user_id=$2, channel_id=$3, platform=$4 WHERE subscription_id=$1 RETURNING *",
    [
      updatedSubscription.subscriptionId,
      updatedSubscription.userId,
      updatedSubscription.channelId,
      updatedSubscription.platform,
    ]
  );
};
