import db from '../database/models/index';

const RequestService = {
  async getOneRequest(condition) {
    const request = await db.Requests.findOne({ where: condition, raw: true, });
    return request;
  },
  async getOnetrip(condition) {
    const trip = await db.Trips.findOne({ where: condition, raw: true });
    return trip;
  },

  async updateRequest(data, condition) {
    const request = await db.Requests.update(data, {
      where: condition, returning: true, plain: true, raw: true,
    });
    return request;
  },

  async updateTrip(data, condition) {
    const trip = await db.Trips.update(data, {
      where: condition, returning: true, plain: true, raw: true,
    });
    return trip;
  }

};

export default RequestService;
