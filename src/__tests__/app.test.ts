import app from "../app";
import request from 'supertest'

// Format #1
it("Returns hello on GET route", done => {
  request(app)
    .get('/')
    .expect('Hello')
    .expect(200, done)
});

describe('Routes', () => {
  describe('User routes', () => {
    it("User route correctly configured", done => {
      request(app)
        .get('/api/users/')
        .expect('User route')
        .expect(200, done)
    });

    it("Login route correctly configured", done => {
      request(app)
        .get('/api/users/login')
        .expect('Protected login route')
        .expect(200, done)
    });

    it("Register route correctly configured", done => {
      request(app)
        .post('/api/users/register')
        .expect('Register route')
        .expect(200, done)
    });

    it("Logout route correctly configured", done => {
      request(app)
        .post('/api/users/logout')
        .expect('Logout route')
        .expect(200, done)
    });
  });

  describe('Channel routes', () => {
    it("User route correctly configured", done => {
      request(app)
        .get('/api/channels/')
        .expect('Channel route')
        .expect(200, done)
    });
  });

  describe('Subscription routes', () => {
    it("User route correctly configured", done => {
      request(app)
        .get('/api/subscriptions/')
        .expect('Subscription route')
        .expect(200, done)
    });
  });
});

// // #Format #2
// it("Return Hello once more", async () => {
//   const res = await request(app).get('/');
//   expect(res.statusCode).toEqual(200);
//   expect(res.text).toBe('Hello');
// });


