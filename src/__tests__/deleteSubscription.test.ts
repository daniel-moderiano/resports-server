import { deleteSubscriptionController } from '../controllers/subscriptionControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { insertChannel, selectChannel } from '../db/channelHelpers';
import { insertSubscription } from '../db/subscriptionHelpers';

// Setup new app instance
const app = express();

// Use the controller
app.delete('/subscriptions/:subscriptionId', deleteSubscriptionController);

describe('deleteSubscription controller', () => {
  // Add subscriptions to the test database
  beforeAll(async () => {
    await insertChannel({ channelId: '1234', channelName: 'VGBootCamp' });
    await insertSubscription({
      channelId: '1234',
      platform: 'twitch',
      userId: '1234'
    });
    await insertSubscription({
      channelId: '1234',
      platform: 'twitch',
      userId: '5678'
    });
  });

  it("deletes subscription in the database", async () => {
    const res = await request(app).delete('/subscriptions/1');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    // The deleted subscription will be returned
    expect(res.body).toStrictEqual({ subscription_id: 1, channel_id: '1234', user_id: '1234', platform: 'twitch' });
  });

  it("does not delete associated subscription channel when other subscriptions to this channel exist", async () => {
    // Check that associated channel still exists in db
    const res = await selectChannel('1234');
    expect(res.rowCount).toBe(1);
    expect(res.rows[0]).toStrictEqual({ channel_id: '1234', channel_name: 'VGBootCamp' })
  });

  it("deletes associated channel if no other subscriptions to this channel exist", async () => {
    // First perform delete on remaining subscription
    await request(app).delete('/subscriptions/2');
    // Then, check that channel is now removed from db
    const res = await selectChannel('1234');
    expect(res.rowCount).toBe(0);
  });

  it("throws error if subscription is not in database", async () => {
    const res = await request(app).delete('/subscriptions/1');
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/text/);
    expect(res.statusCode).toEqual(400);
  });
});

