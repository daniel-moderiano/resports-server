import { getSubscription } from '../controllers/subscriptionControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { insertChannel, insertSubscription, deleteSubscription } from '../db/helpers';

process.env.TEST_ENV === 'true';

// Setup new app instance
const app = express();

// Add mock user to res.locals to make available in tests
app.use((req, res, next) => {
  res.locals.user = {
    sub: 'google-oauth2|103413235432642364'
  };
  next()
});

// Use the controller
app.get('/subscriptions/:subscriptionId', getSubscription);

describe('getSubscription controller', () => {
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

  it("retrieves correct subscription in the database", async () => {
    const res = await request(app).get('/subscriptions/2');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    // There are two channels in the database
    expect(res.body).toStrictEqual({ subscription_id: 2, channel_id: '5678', user_id: '1234', platform: 'twitch' });
  });

  it("throws error if subscription is not in database", async () => {
    // Delete existing channels first
    await deleteSubscription(1);
    await deleteSubscription(2);

    const res = await request(app).get('/subscriptions/1234');
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/text/);
    expect(res.statusCode).toEqual(400);
  });
});


