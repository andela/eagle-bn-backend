/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../database/models';

export default {
  async getUserRequest(id) {
    return db.Requests.findAll({
      where: { UserId: id },
      include: { model: db.Trips, attributes: { exclude: ['RequestId'] } } });
  },

  getProvidedData(data) {
    const entries = Object.entries(data);
    data = {};
    for (const [key, value] of entries) {
      if (value && !value.match('Invalid Date')) data[key] = value;
    }
    return data;
  },

  getCityData(data, city) {
    const names = [];
    let error;
    const suggestions = [];
    for (const key in data) {
      data[key].forEach(e => {
        names.push(e.name.toLocaleLowerCase());
        if ((e.name.toLocaleLowerCase() !== city.toLocaleLowerCase())
      && e.name.toLocaleLowerCase().match(city.toLocaleLowerCase())) {
          error = `${city} city not found`;
        }
      });
    }
    if (error) {
      names.map(e => { if (e.match(city.toLocaleLowerCase())) suggestions.push(e); });
    }
    return { names, error, suggestions };
  }
};
