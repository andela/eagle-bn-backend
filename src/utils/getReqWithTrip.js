import Sequelize from 'sequelize';

const { Op } = Sequelize;

const getReqsWithTrips = (req) => {
  const renameKeys = (obj, newKeys) => {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  };

  const requests = () => {
    const requestsData = renameKeys(req.query, { origin: 'country' });
    const {
      destination, reason, departureTime, origin,
      from, to, ...reqData } = requestsData;
    if (req.query.returnTime) {
      reqData.returnTime = { [Op.like]: `${req.query.returnTime}%` };
    }
    return reqData;
  };

  const trips = () => {
    const tripsData = renameKeys(req.query, { destination: 'country', });
    const {
      status, address, id, destination, origin,
      UserId, returnTime, from, to, ...tripData
    } = tripsData;

    if (tripData.reason) {
      tripData.reason = { [Op.like]: `${tripData.reason}%` };
    }
    if (tripData.departureTime) {
      tripData.departureTime = { [Op.like]: `${tripData.departureTime}%` };
    }
    if (req.query.from && req.query.to) {
      tripData.departureTime = {
        [Op.and]: [
          { [Op.gte]: new Date(req.query.from) }, { [Op.lte]: new Date(req.query.to) }
        ]
      };
    }
    if (req.query.from) {
      tripData.departureTime = {
        [Op.gte]: new Date(req.query.from),
      };
    }
    if (req.query.to) {
      tripData.departureTime = {
        [Op.lte]: new Date(req.query.to)
      };
    }
    return tripData;
  };

  return { trips, requests };
};


export default getReqsWithTrips;
