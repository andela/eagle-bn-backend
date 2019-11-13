import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Get traveled destination with number of visitors', () => {
  it('Should return 200 with an object', (done) => {
    chai.request(app)
      .get('/api/v1/destinations/traveled-destinations')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
