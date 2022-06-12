import { getAllChannels } from '../controllers/channelControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { insertChannel } from '../db/helpers';

// Setup new app instance
const app = express();

// Use the controller
app.get('/', getAllChannels);

// Add some channels to the test database
beforeAll(async () => {
  await insertChannel({ channelId: '1234', channelName: 'VGBootCamp' });
  await insertChannel({ channelId: '5678', channelName: 'BTSSmash' });
});

describe('getAllChannels controller', () => {
  it("retrieves all channels in the DB", async () => {
    const res = await request(app).get('/');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    // There are two channels in the database
    expect(res.body).toStrictEqual([
      { channel_id: '1234', channel_name: 'VGBootCamp' },
      { channel_id: '5678', channel_name: 'BTSSmash' }
    ]);
  });

  it("throws error on bad request", async () => {
    // const res = await request(app).get(`/posts/${postId}/comments`);
    // expect(res.headers['content-type']).toMatch(/json/);
    // expect(res.statusCode).toEqual(200);
    // // First comment is by Peter Parker
    // expect(res.body[0].user.fullName).toBe('Peter Parker');
  });
});

