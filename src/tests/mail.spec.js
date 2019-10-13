import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import data from './mockData/email';
import helpers from '../utils/helper';

chai.use(chaiHttp);
chai.should();

describe('Password Reset', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(data.user1)
      .end(() => done());
  });
  it('Should send reset instructions', (done) => {
    chai.request(app)
      .post('/api/v1/users/reset-password')
      .send({ email: 'rswaib@gmail.com' })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('password reset instructions sent to rswaib@gmail.com');
        done();
      });
  });
  it('Should test for invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/users/reset-password')
      .send({ email: 'rswaib@gmail' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('Invalid email address');
        done();
      });
  });
  it('Should succesfully reset tyhe passwword', (done) => {
    chai.request(app)
      .patch(`/api/v1/users/reset-password/${helpers.createToken(1, 'rswaib@gmail.com')}`)
      .send(data.user1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('password updated successfully');
        done();
      });
  });
  it('Should check if password donot match', (done) => {
    chai.request(app)
      .patch(`/api/v1/users/reset-password/${helpers.createToken(1, 'rswaib@gmail.com')}`)
      .send(data.user2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('password provided do not match');
        done();
      });
  });
  it('Should test an invalid token', (done) => {
    chai.request(app)
      .patch('/api/v1/users/reset-password/44')
      .send(data.user1)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('jwt malformed');
        done();
      });
  });
});
