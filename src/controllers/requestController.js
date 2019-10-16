/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import db from '../database/models';
import sendResult from '../utils/sendResult';

const Request = {
  async getRequest(req, res) {
    try {
      const requests = await db.Requests.findAll({ where: { UserId: req.userId }, raw: true });
      for (const index in requests) {
        requests[index].Trips = await db.Trips.findAll({ where: { RequestId: requests[index].id }, raw: true, attributes: { exclude: ['RequestId'] } });
      }
      return sendResult(res, 200, 'Requests', requests);
    } catch (err) {
      return sendResult(res, 500, `internal server error: ${err.message}`);
    }
  }
};

export default Request;
