import { getAllChannels } from '../controllers/channelControllers';
import request from 'supertest';
import express from 'express';
import './dbSetupTeardown';
import { deleteChannel, insertChannel } from '../db/channelHelpers';

// Setup new app instance
const app = express();

// Use the controller
app.get('/', getAllChannels);

describe('getAllChannels controller', () => {
  // Add some channels to the test database
  beforeAll(async () => {
    await insertChannel({ channelId: '1234', channelName: 'VGBootCamp' });
    await insertChannel({ channelId: '5678', channelName: 'BTSSmash' });
  });

  it("retrieves all channels in the database", async () => {
    const res = await request(app).get('/');

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    // There are two channels in the database
    expect(res.body).toStrictEqual([
      { channel_id: '1234', channel_name: 'VGBootCamp' },
      { channel_id: '5678', channel_name: 'BTSSmash' }
    ]);
  });

  it("returns empty array when no channels exist in the database", async () => {
    // Delete existing channels first
    await deleteChannel('1234');
    await deleteChannel('5678');

    const res = await request(app).get('/');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([]);
  });
});

