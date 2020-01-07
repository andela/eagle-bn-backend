import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';
import { describe, it } from 'mocha';
import myserver from '../index';
import mock2 from './mockData/loginMockData';
import mock from './mockData/accommodationData';
import helper from '../utils/helper';

chai.use(chaiHttp);
const { expect } = chai;

const wrongFile = fs.readFileSync(path.join(__dirname, 'mockData/profile.js'));
const trueFile = fs.readFileSync(path.join(__dirname, 'mockData/img.jpeg'));

let loggedtoken = '';
describe('Update/delete an accommodation tests', () => {
  before((done) => {
    chai.request(myserver)
      .post('/api/v1/users/login')
      .send(mock2[0])
      .end((err, res) => {
        expect(res.status).to.equal(201);
        loggedtoken = res.body.data.token;
        done();
      });
  });
  it('It should return a 200 status, when an accommodation has been updated', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/1')
      .set('Authorization', loggedtoken)
      .send(mock[0])
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data.address).to.equal('kigali');
        expect(res.body.data.cost).to.equal(200000);
        expect(res.body.data.description).to.equal('the first hotel in region');
        expect(res.body.data.name).to.equal('hotel');
        expect(res.body.data.availableSpace).to.equal('3');
        expect(res.body.data.services).to.equal('gym, breakfast');
        expect(res.body.data.amenities).to.equal('wifi, tv');
        done();
      });
  });
  it('It should return a 400 status, when wrong file image is selected', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/1')
      .set('Authorization', loggedtoken)
      .field('address', 'kigali')
      .field('name', 'hotel')
      .field('description', 'the first hotel in region')
      .field('cost', '200000')
      .field('availableSpace', '3')
      .field('services', 'gym, breakfast')
      .field('amenities', 'wifi, tv')
      .attach('images', wrongFile, 'profile.js')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        expect(res.body.msg).to.equals('uploaded files should be images');
        done();
      });
  });
  it('It should return a 201 status, when an image is updated', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/1')
      .set('Authorization', loggedtoken)
      .attach('images', trueFile, 'img.jpeg')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        done();
      });
  });
  it('It should return a 200 status, when all data are note updated', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/1')
      .set('Authorization', loggedtoken)
      .field('address', 'kigali')
      .field('name', 'hotel')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data.address).to.equal('kigali');
        expect(res.body.data.name).to.equal('hotel');
        done();
      });
  });
  it('It should return a 201 status, when it updated an image', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/1')
      .set('Authorization', loggedtoken)
      .attach('images', trueFile, 'img.jpeg')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('It should return a 401 status, when a token is not provided', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/1')
      .send(mock[0])
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        expect(res.body.msg).to.equals('You are not authorized');
        done();
      });
  });
  it('It should return a 401 status, when a user is not a supplier', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/1')
      .set('Authorization', helper.createToken(2, 'alexis2@gmail.com', true, 'requestor'))
      .send(mock[0])
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        done();
      });
  });
  it('It should return a 400 status, when accommodation not found', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/100')
      .set('Authorization', loggedtoken)
      .send(mock[0])
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        done();
      });
  });
  it('It should return a 401 status, when accommodation does not belong to supplier', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/1')
      .set('Authorization', helper.createToken(2, 'alexis2@gmail.com', true, 'host'))
      .send(mock[0])
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        done();
      });
  });
  it('It should return a 400 status, when a wrong id is selected', (done) => {
    chai.request(myserver)
      .patch('/api/v1/accommodations/a')
      .set('Authorization', loggedtoken)
      .send(mock[0])
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        done();
      });
  });
  it('It should return a 200 status, when an accommodation has been deleted', (done) => {
    chai.request(myserver)
      .delete('/api/v1/accommodations/3')
      .set('Authorization', loggedtoken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal(null);
        done();
      });
  });
  it('It should return a 401 status, when the token is not provided to delete', (done) => {
    chai.request(myserver)
      .delete('/api/v1/accommodations/3')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        expect(res.body.msg).to.equals('You are not authorized');
        done();
      });
  });
  it('It should return a 400 status, when an accommodation is not found', (done) => {
    chai.request(myserver)
      .delete('/api/v1/accommodations/100')
      .set('Authorization', loggedtoken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        done();
      });
  });
  it('It should return a 400 status, when a wrong id is selected', (done) => {
    chai.request(myserver)
      .delete('/api/v1/accommodations/a')
      .set('Authorization', loggedtoken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('status');
        done();
      });
  });
});
