import { getAllSubscriptions } from '../controllers/subscriptionControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { deleteChannel, deleteSubscription, insertChannel, insertSubscription } from '../db/helpers';

// Setup new app instance
const app = express();

// Use the controller
app.get('/', getAllSubscriptions);

// Add some channels to the test database
beforeAll(async () => {
  await insertChannel({ channelId: '1234', channelName: 'VGBootCamp' });
  await insertChannel({ channelId: '5678', channelName: 'BTSSmash' });
  await insertSubscription({ userId: 'user1', channelId: '1234', platform: 'twitch' });
  await insertSubscription({ userId: 'user1', channelId: '5678', platform: 'twitch' });
});

describe('getAllChannels controller', () => {
  it("retrieves all channels in the database", async () => {
    const res = await request(app).get('/');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);

    // There are two subscriptions in the database
    expect(res.body).toStrictEqual([
      { subscription_id: 1, user_id: 'user1', channel_id: '1234', platform: 'twitch' },
      { subscription_id: 2, channel_id: '5678', user_id: 'user1', platform: 'twitch' }
    ]);
  });

  it("returns empty array when no channels exist in the database", async () => {
    // Delete existing subscriptions
    await deleteSubscription(1);
    await deleteSubscription(2);

    const res = await request(app).get('/');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([]);
  });
});

