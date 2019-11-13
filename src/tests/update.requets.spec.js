import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import helpers from '../utils/helper';
import reqData from './mockData/update.requests.data';

chai.use(chaiHttp);
chai.should();
describe('update requests tests', () => {
  it('Should successfully update a request', (done) => {
    chai.request(app)
      .put('/api/v1/requests/3/1')
      .set('Authorization', helpers.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send(reqData.req1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('request update successful');
        done();
      });
  });
  it('Should throw error if request not found', (done) => {
    chai.request(app)
      .put('/api/v1/requests/31/1')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .send(reqData.req2)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('request your trying to edit cannot be found');
        done();
      });
  });
  it('Should test for country suggestions', (done) => {
    chai.request(app)
      .put('/api/v1/requests/3/1')
      .set('Authorization', helpers.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send(reqData.req2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('kamp city not found');
        done();
      });
  });
  it('Should check if trip with id exists', (done) => {
    chai.request(app)
      .put('/api/v1/requests/3/41')
      .set('Authorization', helpers.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send(reqData.req1)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('no trip with a given id found');
        done();
      });
  });
  it('Should check if city not in country', (done) => {
    chai.request(app)
      .put('/api/v1/requests/3/1')
      .set('Authorization', helpers.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send(reqData.req3)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('cannot find nairobi in Uganda');
        done();
      });
  });
  it('Should check if cities provided are the same', (done) => {
    chai.request(app)
      .put('/api/v1/requests/3/1')
      .set('Authorization', helpers.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send(reqData.req4)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('trips to the same city not allowed');
        done();
      });
  });
  it('Should test for country suggestions', (done) => {
    chai.request(app)
      .put('/api/v1/requests/3/1')
      .set('Authorization', helpers.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send(reqData.req2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('kamp city not found');
        res.body.data.should.have.property('suggestions');
        done();
      });
  });
  it('Should test for invalid country', (done) => {
    chai.request(app)
      .put('/api/v1/requests/3/1')
      .set('Authorization', helpers.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send(reqData.req5)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('xx is not a valid country');
        done();
      });
  });
  it('Should test for invalid destination country', (done) => {
    chai.request(app)
      .put('/api/v1/requests/3/1')
      .set('Authorization', helpers.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send(reqData.req6)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('XX is not a valid country');
        done();
      });
  });
});
