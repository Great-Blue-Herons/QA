const request = require('supertest');
const app = require('./app.js');

describe ('Server Routes', () => {
  test('GET /qa/questions/?product_id=101', (done) => {
  request(app)
    .get('/qa/questions')
    .query({product_id: 101})
    .expect(200)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
        return done();
    });

  });
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });
});

