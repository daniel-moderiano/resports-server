import app from "../app";
import request from 'supertest'

describe('Channel routes', () => {
  it("Index channel route correctly configured", done => {
    request(app)
      .get('/api/channels/')
      .expect('Channel route')
      .expect(200, done)
  });

  describe('Singular hannel (channelId) routes', () => {
    it("Get single channel route correctly configured", done => {
      request(app)
        .get('/api/channels/1234')
        .expect('Get channel 1234')
        .expect(200, done)
    });

    it("Update single channel route correctly configured", done => {
      request(app)
        .put('/api/channels/1234')
        .expect('Update channel 1234')
        .expect(200, done)
    });

    it("Add single channel route correctly configured", done => {
      request(app)
        .post('/api/channels/1234')
        .expect('Add channel 1234')
        .expect(200, done)
    });

    it("Delete single channel route correctly configured", done => {
      request(app)
        .delete('/api/channels/1234')
        .expect('Delete channel 1234')
        .expect(200, done)
    });
  })
});
