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
  });
});

// // #Format #2
// it("Return Hello once more", async () => {
//   const res = await request(app).get('/');
//   expect(res.statusCode).toEqual(200);
//   expect(res.text).toBe('Hello');
// });


