import app from "../app";
import request from 'supertest'

describe('Base subscription API routes', () => {
  it("Add single subscription route correctly configured", done => {
    request(app)
      .post('/api/subscriptions')
      .expect('Add sub')
      .expect(200, done)
  });

  describe('Singular subscription (subscriptionId) routes', () => {
    it("Get single subscription route correctly configured", done => {
      request(app)
        .get('/api/subscriptions/1234')
        .expect('Get sub 1234')
        .expect(200, done)
    });

    it("Update single subscription route correctly configured", done => {
      request(app)
        .put('/api/subscriptions/1234')
        .expect('Update sub 1234')
        .expect(200, done)
    });

    it("Delete single subscription route correctly configured", done => {
      request(app)
        .delete('/api/subscriptions/1234')
        .expect('Delete sub 1234')
        .expect(200, done)
    });
  })
});
