/* eslint-disable no-prototype-builtins */
import Sequelize from 'sequelize';

const { Op } = Sequelize;

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
  if (origin) reqData.country = origin;
  if (returnTime) reqData.returnTime = { [Op.like]: `${returnTime}%` };

  // trip data
  if (destination) tripData.country = destination;
  if (departureTime) tripData.departureTime = { [Op.like]: `${departureTime}%` };
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
