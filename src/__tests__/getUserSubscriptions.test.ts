import { getUserSubscriptions } from '../controllers/userControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { deleteSubscription, insertChannel, insertSubscription } from '../db/helpers';

// Setup new app instance
const app = express();

// Use the controller
app.get('/users/:userId/subscriptions', getUserSubscriptions);

describe('getAllChannels controller', () => {
  // Add some channels and subs to the test database
  beforeAll(async () => {
    await insertChannel({ channelId: '1234', channelName: 'VGBootCamp' });
    await insertChannel({ channelId: '5678', channelName: 'BTSSmash' });
    await insertSubscription({
      channelId: '1234',
      platform: 'twitch',
      userId: '1234'
    });

    await insertSubscription({
      channelId: '5678',
      platform: 'twitch',
      userId: '1234'
    })
  });

  it("retrieves all subscriptions belonging to the specified user", async () => {
    const res = await request(app).get(`/users/${'1234'}/subscriptions`);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    // There are two subscriptions belonging to this user in the database
    expect(res.body).toStrictEqual([
      {
        "channel_id": "1234",
        "platform": "twitch",
        "subscription_id": 1,
        "user_id": "1234",
      },
      {
        "channel_id": "5678",
        "platform": "twitch",
        "subscription_id": 2,
        "user_id": "1234",
      }
    ]);
  });

  it("returns empty array when no subscriptions exist in the database", async () => {
    // Delete existing channels first
    await deleteSubscription(1);
    await deleteSubscription(2);

    const res = await request(app).get(`/users/${'1234'}/subscriptions`);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([]);
  });
});

