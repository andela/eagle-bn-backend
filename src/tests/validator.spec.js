import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import Check from '../utils/validator';

const should = chai.should();

chai.use(chaiHttp);


describe('Test validations', () => {
  it('should check required fields', () => {
    const req = { body: { should } };
    new Check({ name: req }).req().error.should.eql('name is required');
  });
  it('should check string type', () => {
    const req = { body: { name: 1 } };
    new Check({ name: req }).str().error.should.eql('name should be a string');
  });
  it('should check for gender', () => {
    const req = { body: { gender: 'john' } };
    new Check({ gender: req }).gender().error.should.eql('gender is invalid');
  });
  it('should check numeric string', () => {
    const req = { body: { gender: 'male' } };
    new Check({ gender: req }).gender().should.a('object');
    new Check({ gender: req }).gender().status.should.eql(200);
  });
});
