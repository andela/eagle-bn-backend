import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import helpers from '../utils/helper';

chai.use(chaiHttp);
const { expect } = chai;

describe('/PUT comment', () => {
  it('it should return 201 and create new comment data', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/comment')
      .set('Authorization', helpers.createToken(5, 'admin@gmail.com', true, 'manager'))
      .send({ comment: 'new Comment' })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        done();
      });
  });
  it('should return a 400 when you are not owner of the request or manager', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/comment')
      .send({ comment: 'new Comment' })
      .set('Authorization', helpers.createToken(5, 'admin@gmail.com', true, 'admin'))
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        done();
      });
  });
  it('should return a 201 when you are owner of the request or manager', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/comment')
      .send({ comment: 'new Comment' })
      .set('Authorization', helpers.createToken(2, 'admin@gmail.com', true, 'admin'))
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        done();
      });
  });
});
