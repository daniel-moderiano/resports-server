import { addSubscription } from '../controllers/subscriptionControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { addTestUser } from '../middleware/testUserMiddleware';

// * User ID will only be accessible in a test environment within this controller
process.env.TEST_ENV === 'true';

// Setup new app instance
const app = express();

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

  it("throws error if platform is missing", async () => {
    const res = await request(app).get('/subscriptions/1234');
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/text/);
    expect(res.statusCode).toEqual(400);
  });

  it("throws error if channel ID is missing", async () => {
    const res = await request(app).get('/subscriptions/1234');
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers['content-type']).toMatch(/text/);
    expect(res.statusCode).toEqual(400);
  });
});


