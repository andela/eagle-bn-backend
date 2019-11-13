/* eslint-disable no-prototype-builtins */
import Sequelize from 'sequelize';

const { Op, where, cast, col } = Sequelize;

const getReqsWithTrips = (req) => {
  const {
    origin, id, UserId, status, destination, from, to, departureTime, returnTime
  } = req.query;

  const reqData = {};
  const tripData = {};

  // requests data
  if (id) reqData.id = id;
  if (UserId) reqData.UserId = UserId;
  if (status) reqData.status = status;
  if (origin) reqData.country = { [Op.iLike]: `%${origin}%` };
  if (returnTime) {
    reqData.returnTime = where(
      cast(col('returnTime'), 'varchar'),
      { [Op.iLike]: `%${returnTime}%` }
    );
  }
  // trip data
  if (destination) tripData.country = { [Op.iLike]: `%${destination}%` };
  if (departureTime) {
    tripData.departureTime = where(
      cast(col('departureTime'), 'varchar'),
      { [Op.iLike]: `%${departureTime}%` }
    );
  }
  if (from && to) {
    tripData.departureTime = {
      [Op.and]: [
        { [Op.gte]: new Date(from) }, { [Op.lte]: new Date(to) }
      ]
    };
  }
  if (from) tripData.departureTime = { [Op.gte]: new Date(from) };
  if (to) tripData.departureTime = { [Op.lte]: new Date(to) };
  return { reqData, tripData };
};


export default getReqsWithTrips;
