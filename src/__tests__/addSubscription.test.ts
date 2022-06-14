import { addSubscription } from '../controllers/subscriptionControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { addTestUser } from '../middleware/testUserMiddleware';
import { selectAllFromTable } from '../db/helpers'

// * User ID will only be accessible in a test environment within this controller
process.env.TEST_ENV === 'true';

// Setup new app instance
const app = express();

// Required to parse incoming body params
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add mock user to res.locals to make available in tests
app.use(addTestUser);

// Use the controller
app.post('/subscriptions', addSubscription);

describe('getSubscription controller', () => {
  it("adds new subscription when all details are provided", async () => {
    const res = await request(app)
      .post('/subscriptions')
      .send({
        channelId: '1234',
        channelName: 'VGBootCamp',
        userId: '12345678910',
        platform: 'twitch'
      });

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({
      channel_id: '1234',
      user_id: '12345678910',
      platform: 'twitch',
      subscription_id: 1
    });
  });

  it("throws error if attempting to add duplicate subscription", async () => {
    const res = await request(app)
      .post('/subscriptions')
      .send({
        channelId: '1234',
        channelName: 'VGBootCamp',
        userId: '12345678910',
        platform: 'twitch'
      });

    // Will be text-response in test env, and JSON in prod env
    expect(res.headers['content-type']).toMatch(/text/);
    expect(res.text).toContain('duplicate')
    expect(res.statusCode).toEqual(500);
  });

  it("throws error if platform is missing", async () => {
    const res = await request(app)
      .post('/subscriptions')
      .send({ channelId: '1234', channelName: 'VGBootCamp' });
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(400);
    // Should return array of errors, in this case single error for missing param
    expect(res.body.length).toBe(1)
  });

  it("throws error if channel ID is missing", async () => {
    const res = await request(app)
      .post('/subscriptions')
      .send({ platform: 'twitch', channelName: 'VGBootCamp' });
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(400);
    // Should return array of errors, in this case single error for missing param
    expect(res.body.length).toBe(1)
  });

  it("throws error if channel name is missing", async () => {
    const res = await request(app)
      .post('/subscriptions')
      .send({ platform: 'twitch', channelId: '1234' });
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(400);
    // Should return array of errors, in this case single error for missing param
    expect(res.body.length).toBe(1)
  });
});


