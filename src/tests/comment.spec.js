import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import helpers from '../utils/helper';

chai.use(chaiHttp);
const { expect } = chai;

describe('/POST comment', () => {
  it('it should return 401 when request id does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/comments/')
      .set('Authorization', helpers.createToken(5, 'admin@gmail.com', true, 'manager'))
      .send({ comment: 'new Comment', requestId: 100 })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('it should return 201 and create new comment data', (done) => {
    chai.request(app)
      .post('/api/v1/comments/')
      .set('Authorization', helpers.createToken(5, 'admin@gmail.com', true, 'manager'))
      .send({ comment: 'new Comment', requestId: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data.comment).to.equal('new Comment');
        done();
      });
  });
  it('should return a 400 if one field is missing', (done) => {
    chai.request(app)
      .post('/api/v1/comments/')
      .send({ comment: 'new Comment' })
      .set('Authorization', helpers.createToken(2, 'admin@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.msg).to.equal('requestId is required');
        done();
      });
  });
  it('should return a 400 when you are not owner of the request or manager', (done) => {
    chai.request(app)
      .post('/api/v1/comments/')
      .send({ comment: 'new Comment', requestId: 1 })
      .set('Authorization', helpers.createToken(2, 'admin@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        done();
      });
  });
});

describe('GET /comment', () => {
  it('should return a 201 when you are owner of the request or manager', (done) => {
    chai.request(app)
      .get('/api/v1/comments/1')
      .send({ comment: 'new Comment' })
      .set('Authorization', helpers.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        done();
      });
  });
  it('should return a 201 when you are owner of the request or manager you want to see the thread', (done) => {
    chai.request(app)
      .get('/api/v1/comments/1')
      .set('Authorization', helpers.createToken(5, 'manager@gmail.com', true, 'manager'))
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        done();
      });
  });
  it('it should return 401 when request id does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/comments/100')
      .set('Authorization', helpers.createToken(5, 'admin@gmail.com', true, 'manager'))
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
