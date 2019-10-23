/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import db from '../database/models';
import sendResult from '../utils/sendResult';
import { msg, transporter } from '../config';

const sendMail = (req, res, newRequest) => {
  const title = `Request ${newRequest.status}`;
  const url = `/api/v1/requests/${newRequest.id}`;
  const actionMsg = 'View request';
  const emailMsg = `Your viewing this message because your request has been ${newRequest.status} at Barefoot nomard`;
  const message = { ...msg(req, url, title, emailMsg, actionMsg), to: req.user.email };
  transporter.sendMail(message, () => sendResult(res, 200, 'updated successfully', newRequest));
};

const Request = {
  async getRequest(req, res) {
    const requests = await db.Requests.findAll({ where: { UserId: req.userId }, raw: true });
    for (const index in requests) {
      requests[index].Trips = await db.Trips.findAll({ where: { RequestId: requests[index].id }, raw: true, attributes: { exclude: ['RequestId'] } });
    }
    return sendResult(res, 200, 'Requests', requests);
  },

  async changeRequestStatus(req, res) {
    const { status } = req.params;
    const { request } = req;
    if (request.status === 'pending') {
      const newRequest = await request.update({ status });
      return sendMail(req, res, newRequest);
    }
    return sendResult(res, 403, 'this request is already approved/rejected');
  },

  async getSingleRequest(req, res) {
    sendResult(res, 200, 'request data', req.request);
  },

  async getManagerRequests(req, res) {
    const { status } = req.query;
    const { managerId } = req.params;
    const includeUser = { model: db.Users, attributes: ['id', 'email', 'lineManager'], where: { lineManager: managerId } };
    let requests;
    if (status) {
      requests = await db.Requests.findAll({
        where: { status },
        include: [includeUser],
      });
    } else {
      requests = await db.Requests.findAll({
        include: [includeUser]
      });
    }
    sendResult(res, 200, 'request list', requests);
  }
};

export default Request;
