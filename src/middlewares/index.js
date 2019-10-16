/* eslint-disable arrow-parens */
/* eslint-disable import/prefer-default-export */
import db from '../database/models';
import helper from '../utils/helper';
import sendResult from '../utils/sendResult';

export const getUserId = email => db.Users.findOne({ where: { email }, attributes: ['id'] });
export const isUserVerified = async (req, res, next) => {
  const token = helper.getToken(req);
  const { userId, email, verified } = await helper.verifyToken(token || 'Invalid');
  if (!(userId) || !(email) || verified === undefined) {
    return sendResult(res, 401, 'Invalid Token');
  }
  if (!verified) {
    return sendResult(res, 400, 'The user is not verified');
  }
  req.userId = userId;
  next();
};
