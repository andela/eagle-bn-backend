/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
import db from '../database/models';
import sendResult from '../utils/sendResult';
import { msg, transporter } from '../config';
import allRequest from '../utils/requestUtils';
import requestData from '../utils/getReqWithTrip';
import RequestService from '../services/request.service';

const sendMail = (req, res, newRequest) => {
  const title = `Request ${newRequest.status}`;
  const url = `/api/v1/requests/${newRequest.id}`;
  const actionMsg = 'View request';
  const emailMsg = `Your viewing this message because your request has been ${newRequest.status} at Barefoot nomard`;
  const message = { ...msg(req, url, title, emailMsg, actionMsg), to: req.user.email };
  transporter.sendMail(message, () => {
    sendResult(res, 200, 'updated successfully', newRequest);
  });
};

const Request = {
  async getRequest(req, res) {
    try {
      const requests = await allRequest.getUserRequest(req.userData.userId);
      return sendResult(res, 200, 'Requests', requests);
    } catch (err) {
      return sendResult(res, 400, 'something went wrong!');
    }
  },

  async postRequest(req, res) {
    try {
      const { country, city, returnTime, trips, timeZone, rememberMe } = req.body;
      const request = {};
      request.country = country;
      request.city = city;
      request.UserId = req.userData.userId;
      request.status = 'pending';
      request.timeZone = timeZone;
      if (returnTime) request.returnTime = returnTime;
      let Req = await db.Requests.create(request);
      Req = Req.get({ plain: true });
      const Trips = [];
      let index = 0;
      for (const trip of trips) {
        const single = {};
        single.country = trip.country;
        single.city = trip.city;
        single.reason = trip.reason;
        single.departureTime = trip.departureTime;
        single.accommodationId = (trip.accommodationId) || null;
        single.RequestId = Req.id;
        // eslint-disable-next-line no-await-in-loop
        Trips[index] = await db.Trips.create(single, { raw: true });
        index += 1;
      }
      Req.trips = Trips;
      if (req.userData.rememberMe !== rememberMe) {
        await db.Users.update({ rememberMe }, {
          where: { userid: req.userData.userId },
        });
        return sendResult(res, 201, 'A request created and personal data remembered', Req);
      }
      return sendResult(res, 201, 'A request created but personal data not remembered', Req);
    } catch (err) {
      return sendResult(res, 400, 'something went wrong!');
    }
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
  },

  async search(req, res) {
    const { tripData, reqData } = requestData(req);
    if (req.user.role !== 'admin' && req.user.role !== 'Tadmin') {
      reqData.UserId = req.user.userId;
    }
    const request = await db.Requests.findAll({
      where: reqData,
      include: [{ model: db.Trips, where: tripData, required: true }]
    });

    return sendResult(res, 200, 'Search results', request);
  },

  async updateRequest(req, res) {
    const { country, city, returnTime, reason, trip } = req.body;
    const { requestId, tripId } = req.params;
    let request = { country, city, returnTime: new Date(returnTime).toLocaleString() };
    let trips = {
      country: trip.country,
      city: trip.city,
      departureTime: new Date(trip.departureTime).toLocaleString(),
      reason
    };
    const reqData = allRequest.getProvidedData(request);
    const tripData = allRequest.getProvidedData(trips);
    if (reqData) {
      const condition = { id: requestId, UserId: req.user.id, status: 'pending' };
      request = await RequestService.updateRequest(reqData, condition);
    }
    if (tripData) {
      const condition = { id: tripId };
      trips = await RequestService.updateTrip(tripData, condition);
      request[1].trip = trips[1];
    }
    return sendResult(res, 200, 'request update successful', request[1]);
  },

};

export default Request;
