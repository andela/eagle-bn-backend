import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Currency Converter', () => {
  it('Should return 201, on success request', (done) => {
    chai.request(app)
      .post('/api/v1/currencies')
      .send({ money: 10012.12, from: 'CAD', to: 'RWF' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.should.be.a('object');
        done();
      });
  });
  it('Should return 400, on invalid currency', (done) => {
    chai.request(app)
      .post('/api/v1/currencies')
      .send({ money: 10012.12, from: 'CAE', to: 'RWZ' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('one or both currencies are invalid');
        done();
      });
  });
});
