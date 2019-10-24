/* eslint-disable arrow-parens */
import sendResult from '../utils/sendResult';
import db from '../database/models/index';

const notAuthorized = res => sendResult(res, 401, 'you are not authorized');
const roles = {
  checkManager(req, res, next) {
    if (req.userData.role === 'manager') return next();
    return notAuthorized(res);
  },
  checkHost(req, res, next) {
    if (req.userData.role === 'host') return next();
    return notAuthorized(res);
  },

  checkRequester(req, res, next) {
    if (req.userData.role === 'requester') return next();
    return notAuthorized(res);
  },
  async checkRequestOwner(req, res, next) {
    const { requestDetails } = req;
    const { userId } = req.userData;
    const user = await db.Users.findOne({ where: { id: requestDetails.UserId }, raw: true });
    if (user.lineManager === userId || user.id === userId) return next();
    return sendResult(res, 401, 'you are not authorized');
  }
};
export default roles;
