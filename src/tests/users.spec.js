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
  it('Should update user profile', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ language: 'english' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('language').eql('english');
        res.body.should.have.property('msg').eql('Profile updated successfully');
        done();
      });
  });
  it('Should update user profile', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ language: 'english' })
      .attach('avatar', 'src/tests/mockData/img.png')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('language').eql('english');
        res.body.should.have.property('msg').eql('Profile updated successfully');
        done();
      });
  });
  it('Should throw error when image source not found', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Content-Type', 'multipart/form-data')
      .field({ language: 'english' })
      .attach('avatar', 'src/tests/mockData/img.png')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('msg').eql('provide token to get access');
        done();
      });
  });
  it('Should test an invalid token', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', '44')
      .set('Content-Type', 'multipart/form-data')
      .field({ language: 'english' })
      .attach('avatar', 'src/tests/mockData/img.png')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('jwt malformed');
        done();
      });
  });
  it('Should test an invalid token', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ language: 'english' })
      .attach('avatar', 'src/tests/mockData/img.mp3')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('avatar image fomart is invalid');
        done();
      });
  });
  it('Should test an invalid password', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ password: 'english12@@', comfirmPassword: 'english12@' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('password provided do not match');
        done();
      });
  });
  it('Should test an invalid password', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ password: 'english12', comfirmPassword: 'english12' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('password should have 1 special character and alphanumeric');
        done();
      });
  });
  it('Should test for alphabetic', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ language: '123' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('language should be alphabetic');
        done();
      });
  });
  it('Should test for alphabetic', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ gender: '123' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('gender is invalid');
        done();
      });
  });
  it('Should test for alphabetic', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ gender: '123' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('gender is invalid');
        done();
      });
  });
  it('Should test for alphabetic', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ address: '?' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('address should be alphanumeric');
        done();
      });
  });
  it('Should test for alphabetic', (done) => {
    chai.request(app)
      .patch('/api/v1/users/update-profile')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com'))
      .set('Content-Type', 'multipart/form-data')
      .field({ address: '?' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('address should be alphanumeric');
        done();
      });
  });
});
