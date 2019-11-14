import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import helper from '../utils/helper';

chai.use(chaiHttp);
const { expect } = chai;
let parentId = 0;
describe('chat', () => {
  it('it should return 201 when chat is posted', (done) => {
    chai.request(app)
      .post('/api/v1/chats/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send({ message: 'hey man' })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.msg).to.equal('chat posted successfully');
        expect(res.body.data.message).to.equal('hey man');
        done();
      });
  });
  it('it should return 201 when private chat is created', (done) => {
    chai.request(app)
      .post('/api/v1/chats/')
      .set('Authorization', helper.createToken(1, 'requester@gmail.com', true, 'requester'))
      .send({ message: 'hey man', receiverId: 3 })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        parentId = res.body.data.id;
        expect(res.body.msg).to.equal('chat posted successfully');
        expect(res.body.data.message).to.equal('hey man');
        done();
      });
  });
  it('it should return 201 when private chat is created', (done) => {
    chai.request(app)
      .post('/api/v1/chats/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send({ message: 'hey man', receiverId: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        parentId = res.body.data.id;
        expect(res.body.msg).to.equal('chat posted successfully');
        expect(res.body.data.message).to.equal('hey man');
        done();
      });
  });
  it('it should return 403 when user not part of the discussion', (done) => {
    chai.request(app)
      .post('/api/v1/chats/')
      .set('Authorization', helper.createToken(6, 'requester@gmail.com', true, 'requester'))
      .send({ message: 'hey man', receiverId: 1, parentId })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
  it('it should return 201 when child chat is created', (done) => {
    chai.request(app)
      .post('/api/v1/chats/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send({ message: 'hey man', receiverId: 1, parentId })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.msg).to.equal('chat posted successfully');
        expect(res.body.data.message).to.equal('hey man');
        done();
      });
  });
  it('it should return 403 when user send message to himself', (done) => {
    chai.request(app)
      .post('/api/v1/chats/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send({ message: 'hey man', receiverId: 3 })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
  it('it should return 400 when receiverId does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/chats/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send({ message: 'hey man', receiverId: 78 })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.msg).to.equal('this user does not exist');
        done();
      });
  });
  it('it should return 400 when message is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/chats/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.msg).to.equal('message is required');
        done();
      });
  });
  it('it should return 200 and  all chats', (done) => {
    chai.request(app)
      .get('/api/v1/chats/')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('chat list');
        expect(res.body.data.public.length).to.equal(1);
        done();
      });
  });
  it('it should return 200 and  all chats', (done) => {
    chai.request(app)
      .get('/api/v1/chats?limit=1&offset=0')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('chat list');
        done();
      });
  });
  it('it should return 200 and  all chats replies', (done) => {
    chai.request(app)
      .get(`/api/v1/chats/${parentId}/replies`)
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('chat replies');
        done();
      });
  });
  it('it should return 404 when parentid does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/chats/900/replies')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.msg).to.equal('parent chat or chat parameter not found');
        done();
      });
  });
  it('it should return 400 and  all chats', (done) => {
    chai.request(app)
      .get('/api/v1/chats?limit=l&offset=0')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.msg).to.equal('limit should be an integer');
        done();
      });
  });
  it('it should return 400 and  all chats', (done) => {
    chai.request(app)
      .get('/api/v1/chats?limit=1&offset=n')
      .set('Authorization', helper.createToken(3, 'requester@gmail.com', true, 'requester'))
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.msg).to.equal('offset should be an integer');
        done();
      });
  });
});
