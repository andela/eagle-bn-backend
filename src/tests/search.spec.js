import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import helpers from '../utils/helper';

chai.use(chaiHttp);
chai.should();
describe('Search functionality', () => {
  it('Should search in database', (done) => {
    chai.request(app)
      .get('/api/v1/requests/search?status=pending')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('Search results');
        done();
      });
  });
  it('Should search as requester', (done) => {
    chai.request(app)
      .get('/api/v1/requests/search?status=pending')
      .set('Authorization', helpers.createToken(3, 'rswaib@gmail.com', true, 'Tadmin'))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('Search results');
        done();
      });
  });
  it('Should search as requester', (done) => {
    chai.request(app)
      .get('/api/v1/requests/search?status=pending')
      .set('Authorization', helpers.createToken(3, 'rswaib@gmail.com', true, 'manager'))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('Search results');
        done();
      });
  });
  it('Should search in database', (done) => {
    chai.request(app)
      .get('/api/v1/requests/search?status=pending&from=2030-10-23')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com', true, 'requester'))
      .end((err, res) => {
        res.body.should.have.property('msg').eql('Oops no results found');
        done();
      });
  });
  it('Should search in database', (done) => {
    chai.request(app)
      .get('/api/v1/requests/search?status=pending&from=2030-10-23')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('provide token to get access');
        done();
      });
  });
  it('Should  check for invalid fields', (done) => {
    chai.request(app)
      .get('/api/v1/requests/search?status=pending&from=2030-10-23&tigo=us')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com', true, 'requester'))
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('tigo is invalid parameter');
        done();
      });
  });
  it('Should search in database pending', (done) => {
    chai.request(app)
      .get('/api/v1/requests/search?status=pending&reason=I do&departureTime=2019-10-24&to=2019-10-24&returnTime=2019-10-24')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com', true, 'requester'))
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('Oops no results found');
        done();
      });
  });
  it('Should search in database pending', (done) => {
    chai.request(app)
      .get('/api/v1/requests/search?status=pending&reason=I do&from=2019-10-24&to=2019-10-24&returnTime=2019-10-24')
      .set('Authorization', helpers.createToken(1, 'rswaib@gmail.com', true, 'requester'))
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('Oops no results found');
        done();
      });
  });
});
