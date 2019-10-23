import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '..';
import helper from '../utils/helper';
import requests from './mockData/request';

chai.use(chaiHttp);
const { expect } = chai;

describe('create request', () => {
  it('create request, should return a 201 status', (done) => {
    chai.request(app)
      .post('/api/v1/requests/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send(requests[0])
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('should return a 400 status when timeZone is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/requests/')
      .send(requests[1])
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return a 400 status when user is not verified', (done) => {
    chai.request(app)
      .post('/api/v1/requests/')
      .send(requests[2])
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
