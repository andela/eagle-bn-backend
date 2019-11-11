import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import helpers from '../utils/helper';

chai.use(chaiHttp);
chai.should();
describe('statistics in x time frame', () => {
  it('Should return results of 1 day ago', (done) => {
    chai.request(app)
      .get('/api/v1/requests/stats?days=2')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('Trip statistics for 2 days ago');
        done();
      });
  });
  it('Should return results of 1 week ago', (done) => {
    chai.request(app)
      .get('/api/v1/requests/stats?weeks=1')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('Trip statistics for 1 weeks ago');
        done();
      });
  });
  it('Should reject second parameter', (done) => {
    chai.request(app)
      .get('/api/v1/requests/stats?days=1&months=1')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('you can provide one query at a time');
        done();
      });
  });
  it('Should check for invalid parameter', (done) => {
    chai.request(app)
      .get('/api/v1/requests/stats?days=1&monday=1')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('monday is an invalid parameter');
        done();
      });
  });
  it('Should check fir invalid parameter', (done) => {
    chai.request(app)
      .get('/api/v1/requests/stats?days=fff')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('days should be a number');
        done();
      });
  });
  it('Should check fir invalid parameter', (done) => {
    chai.request(app)
      .get('/api/v1/requests/stats?months=20000000000000000000000')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('provide a valid date interval');
        done();
      });
  });
  it('Should check fir invalid parameter', (done) => {
    chai.request(app)
      .get('/api/v1/requests/stats')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('all trip statistics');
        done();
      });
  });
});
