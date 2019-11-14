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
  it('should return a 200 status and return a single accommodation', (done) => {
    chai.request(app)
      .get('/api/v1/requests/1')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('request data');
        done();
      });
  });
  it('should return a 400 status when a wrong requestId is provided', (done) => {
    chai.request(app)
      .get('/api/v1/requests/xxxx')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.msg).to.equal('request Id should be integer');
        done();
      });
  });
  it('should return a 404 status when request not found', (done) => {
    chai.request(app)
      .get('/api/v1/requests/1000')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.msg).to.equal('no request with such an id');
        done();
      });
  });
});
