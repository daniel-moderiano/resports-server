import { addSubscription } from '../controllers/subscriptionControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { addTestUser } from '../middleware/testUserMiddleware';

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
      .send({ text: 'updated' });

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe('updated');
  });

  it("adds new subscription when all details are provided", async () => {
    const res = await request(app)
      .post('/subscriptions')
      .send({ text: 'updated' });

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe('updated');
  });

  it("throws error if platform is missing", async () => {
    const res = await request(app)
      .post('/subscriptions')
      .send({ channelId: '1234' });
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(400);
    // Should return array of errors, in this case single error for missing param
    expect(res.body.length).toBe(1)
  });

  it("throws error if channel ID is missing", async () => {
    const res = await request(app)
      .post('/subscriptions')
      .send({ platform: 'twitch' });
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(400);
    // Should return array of errors, in this case single error for missing param
    expect(res.body.length).toBe(1)
  });
});


