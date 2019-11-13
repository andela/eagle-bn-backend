import { Sequelize } from 'sequelize';
import db from '../database/models/index';

const DestinationsService = {
  async getAllCities() {
    // eslint-disable-next-line no-return-await
    return await db.Trips.findAll({ attributes: ['country', 'city', [Sequelize.fn('COUNT', 'city'), 'N of visitors']],
      group: ['city', 'country'],
      order: [[Sequelize.fn('COUNT', 'city'), 'DESC']]
    });
  }
};

export default DestinationsService;
