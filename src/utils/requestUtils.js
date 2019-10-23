import db from '../database/models';

export default {
  async getUserRequest(id) {
    return db.Requests.findAll({
      where: { UserId: id },
      include: { model: db.Trips, attributes: { exclude: ['RequestId'] } } });
  }
};
