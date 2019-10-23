import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '..';
import helper from '../utils/helper';

chai.use(chaiHttp);
const { expect } = chai;

describe('get requests test', () => {
  it('get all requests, should return a 200 status', (done) => {
    chai.request(app)
      .get('/api/v1/requests/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Requests');
        done();
      });
  });
  it('should return a 401 status when token is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/requests/')
      .set('Authorization', 'wefhkwefkwjebfkjewfkj')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.msg).to.equal('You are not authorized');
        done();
      });
  });
  it('should return a 401 status when token is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/requests/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'admin'))
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.msg).to.equal('you are not authorized');
        done();
      });
  });
});
