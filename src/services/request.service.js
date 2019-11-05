import db from '../database/models';

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
  },

  getTripOwner: async (id) => {
    const { RequestId } = await db.Trips.findOne({ where: { id }, attributes: ['RequestId'] });
    const { UserId } = await db.Requests.findOne({ where: { id: RequestId }, attributes: ['UserId'] });
    return UserId;
  },
};

export default RequestService;
