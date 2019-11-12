import moment from 'moment';
import Sequelize from 'sequelize';
import sendResult from '../utils/sendResult';
import RequestService from '../services/request.service';
import CommentService from '../services/comment.service';
import UserService from '../services/user.service';

const { Op } = Sequelize;

const requestMidd = {
  async checkExistingTrip(req, res, next) {
    const { requestId } = req.params;
    const request = await RequestService.getOneRequest({ id: requestId });
    if (request) {
      req.request = request;
      return next();
    }
    return sendResult(res, 404, 'no request with such an id');
  },

  async checkLineManager(req, res, next) {
    const { request } = req;
    const { userData } = req;
    const user = await UserService.getUser({ id: request.UserId });
    if (user.lineManager === userData.userId) {
      req.user = user;
      return next();
    }
    return sendResult(res, 401, 'you are not managing this request');
  },

  async checkManagerId(req, res, next) {
    const { managerId } = req.params;
    const { userData } = req;
    if (userData.userId.toString() === managerId) return next();
    return sendResult(res, 401, 'you are not authorized');
  },

  async checkTripOwner(req, res, next) {
    const { userId } = req.userData;
    const { TripId } = req.body;
    const user = await RequestService.getTripOwner(TripId);
    if (user === userId) return next();
    return sendResult(res, 401, 'you are not authorized');
  },

  async checkRequestOwner(req, res, next) {
    const { request } = req;
    const { userId } = req.userData;
    const user = await UserService.getUser({ id: request.UserId });
    if (user.lineManager === userId || user.id === userId) return next();
    return sendResult(res, 401, 'you are not authorized');
  },

  async checkIfTripExists(req, res, next) {
    const condition = { id: req.params.tripId || req.body.TripId };
    const trip = await RequestService.getOnetrip(condition);
    if (trip) {
      req.trip = trip;
      return next();
    }
    return sendResult(res, 404, 'no trip with a given id found');
  },

  async checkIfReqExist(req, res, next) {
    const condition = { id: req.params.requestId, UserId: req.params.userId || req.user.id, status: 'pending' };
    const request = await RequestService.getOneRequest(condition);
    if (!request) return sendResult(res, 404, 'request your trying to edit cannot be found');
    req.request = request;
    next();
  },

  async checkCommentOwner(req, res, next) {
    const getComment = await CommentService.getComment(req.params.commentId);

    if (!getComment) return sendResult(res, 404, 'Comment does not exist');

    if (getComment.userId !== req.userData.userId) return sendResult(res, 401, 'You are not Authorized, You are not the owner of the comment');

    if (getComment.deletedAt !== null) return sendResult(res, 401, 'The Comment has already been deleted');

    next();
  },

  async checkStats(req, res, next) {
    let key = Object.keys(req.query)[0];
    let value = req.query[key];
    const { weeks } = req.query;
    let weeksKey;
    if (req.query.weeks) {
      value *= 7; weeksKey = 'weeks'; key = 'days';
    }
    const query = new Date(moment().subtract(value, key));
    const tripCondition = {
      departureTime: { [Op.gte]: query },
    };
    const reqCondition = { UserId: req.user.id };
    if (query.toDateString() === 'Invalid Date') {
      return sendResult(res, 400, 'provide a valid date interval');
    }
    const data = key ? await RequestService.findAllTrips(reqCondition, tripCondition)
      : await RequestService.findAllTrips(reqCondition);

    if (key) {
      return sendResult(res, 200, `Trip statistics for ${weeks || value} ${weeksKey || key} ago`, {
        period_name: weeksKey || key,
        period_num: weeks || value,
        num_trips: data.length,
        period_from: query,
        period_to: new Date(),
      });
    }
    req.reqCondition = reqCondition;
    next();
  }
};
export default requestMidd;
