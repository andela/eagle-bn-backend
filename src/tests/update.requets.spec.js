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
      .put('/api/v1/requests/3')
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
      .put('/api/v1/requests/31')
      .set('Authorization', helpers.createToken(1, 'andelaeagle@gmail.com', true, 'admin'))
      .send(reqData.req2)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('request your trying to edit cannot be found');
        done();
      });
  });
});
