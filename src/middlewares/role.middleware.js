/* eslint-disable arrow-parens */
import sendResult from '../utils/sendResult';
import helper from '../utils/helper';

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

  checkHostOrTAdmin(req, res, next) {
    if (req.userData.role === 'host' || req.userData.role === 'Tadmin') return next();
    return notAuthorized(res);
  },

  checkRequester(req, res, next) {
    if (req.userData.role === 'requester') return next();
    return notAuthorized(res);
  },
  checkAdmin(req, res, next) {
    const token = helper.getToken(req);
    const data = helper.verifyToken(token);

    if (data.error) {
      return sendResult(res, 401, 'You are not authorized');
    }
    if (data.role !== 'admin') return sendResult(res, 401, 'You are not authorized,You need to be a System administrator');

    if (data.email === req.body.email) return sendResult(res, 400, 'You are not authorized,You can\'t change your own role');

    req.userData = data;
    return next();
  }
};
export default roles;
