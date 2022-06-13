import { deleteSubscriptionController } from '../controllers/subscriptionControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { insertChannel, insertSubscription, deleteSubscription } from '../db/helpers';

// Setup new app instance
const app = express();

// Use the controller
app.delete('/subscriptions/:subscriptionId', deleteSubscriptionController);

// Add a subscription to the test database
beforeAll(async () => {
  await insertChannel({ channelId: '1234', channelName: 'VGBootCamp' });
  await insertSubscription({
    channelId: '1234',
    platform: 'twitch',
    userId: '1234'
  });
});

describe('deleteSubscription controller', () => {
  it("deletes subscription in the database", async () => {
    const res = await request(app).delete('/subscriptions/1');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    // The deleted subscription will be returned
    expect(res.body).toStrictEqual({ subscription_id: 1, channel_id: '1234', user_id: '1234', platform: 'twitch' });
  });

  it("throws error if subscription is not in database", async () => {
    const res = await request(app).delete('/subscriptions/1');
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/text/);
    expect(res.statusCode).toEqual(400);
  });
});

