import { addTestUser } from '../middleware/testUserMiddleware';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';

// * User ID will only be accessible in a test environment within this controller
process.env.TEST_ENV === 'true';

// Setup new app instance
const app = express();

// Add mock user to res.locals to make available in tests
app.use(addTestUser);

// Simple index route to return the userId that should have been added by the test middleware
app.get('/', (req, res) => {
  const userId: string = res.locals.user.sub;
  res.json({ userId })
});

describe('addTestUser middleware', () => {
  it("attaches a userId property via the res.locals.user.sub object", async () => {
    const res = await request(app).get('/')

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({ userId: 'google-oauth2|103413235432642364' });
  });
});


