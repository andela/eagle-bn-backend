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
  async commentCheckUser(req, res, next) {
    const Owner = await db.Requests.findOne({ where: { id: req.params.requestId }, attributes: ['UserId'] }, { raw: true });
    if (req.userData.role === 'manager' || Owner.UserId === req.userData.userId) return next();
    return notAuthorized(res);
  },
};
export default roles;
