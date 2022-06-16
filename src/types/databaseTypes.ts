
// Subscription-related types
export interface Subscription {
  // This is an optional field, because subscriptionId is not required when creating a subscription, but may be present in some cases for other reasons
  subscriptionId?: number | string;
  platform: string;
  channelId: string;
  userId: string;
}

export interface SubscriptionDbResult {
  subscription_id: number | string;
  platform: string;
  channel_id: string;
  user_id: string;
}

// Channel-related types
export interface Channel {
  channelId: string;
  channelName: string;
}

export interface ChannelDbResult {
  channel_id: string;
  channel_name: string;
}