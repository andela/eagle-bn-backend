import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import stringHelper from '../utils/stringHelper';
import mockData from './mockData/signupMockupData';

chai.use(chaiHttp);

describe('signup', () => {
  it('should return a 201 status, a jwt token and user data when', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData[0])
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.msg.should.equal(stringHelper.signupSuccess);
        res.body.data.email.should.equal('');
        res.boby.data.should.have.property('token');
        done();
      });
  });
  it('should return a 409 status and error message', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData[0])
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.msg.should.equal(stringHelper.signupEmailExist);
        done();
      });
  });
  it('should return a 400 status when email not sent', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData[1])
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.msg.should.equal('email is required');
        done();
      });
  });
  it('should return a 400 status when username not sent', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData[2])
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.msg.should.equal('user is required');
        done();
      });
  });
  it('should return a 400 status when password lenght less than 8', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData[3])
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.msg.should.equal('password should be greater than 8');
        done();
      });
  });
  it('should return a 400 status when password is not alphanumeric', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData[4])
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.msg.should.equal('password should be numeric');
        done();
      });
  });
});
