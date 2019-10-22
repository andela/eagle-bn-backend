import db from '../database/models';
import helper from '../utils/helper';
import sendResult from '../utils/sendResult';

export const getUserRole = id => db.Roles.findOne({ where: { id }, attributes: ['roleValue'], raw: true });
export const isUserVerifiedAndRequester = async (req, res, next) => {
  const token = helper.getToken(req);
  const { userId, email, verified, role } = await helper.verifyToken(token || 'Invalid');
  if (!(userId) || !(email) || verified === undefined || !(role)) {
    return sendResult(res, 401, 'Invalid Token');
  }
  if (!verified) {
    return sendResult(res, 400, 'The user is not verified');
  }
  if (role !== 'requester') {
    return sendResult(res, 400, 'The user is not a requester');
  }
  req.user = { userId, email, verified, role };
  next();
};
