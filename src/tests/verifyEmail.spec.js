import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import myserver from '../index';
import helpers from '../utils/helper';

chai.use(chaiHttp);
const { expect } = chai;

describe('email verification', () => {
  it('It should return a 200 status, when email is  verified', (done) => {
    chai.request(myserver)
      .get(`/api/v1/users/verify/${helpers.createToken(1, 'lemoissonmetre@gmail.com', false)}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('email verified! try to login with your existing account');
        done();
      });
  });
  it('It should return a 401 status, when token is invalid', (done) => {
    chai.request(myserver)
      .get('/api/v1/users/verify/wuefgh9823u98r2uif')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.msg).to.equal('invalid token, try to check your email again');
        done();
      });
  });
});
