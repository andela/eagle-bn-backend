
import sendResult from './sendResult';
import helper from './helper';

const checkAdmin = (req, res, next) => {
  const token = helper.getToken(req);
  const data = helper.verifyToken(token);

  if (data.error) {
    return sendResult(res, 401, 'You are not authorized');
  }
  if (data.role !== 'admin') return sendResult(res, 401, 'You are not authorized,You need to be a System administrator');

  return next();
};

export default checkAdmin;
