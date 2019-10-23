/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
import moment from 'moment';
import 'moment-timezone';
import places from '../../services/countries.json';
import { allScores, highScores } from '../../services';
import resSend from '../../utils/sendResult';
import db from '../../database/models';

export const checkStringInArray = (array, string, n) => ((array.find(element => element.toLocaleLowerCase()
  === string.toLocaleLowerCase()))
    || highScores(allScores(array, string), n));

export const checkDate = (req, date, timeZone) => {
  const parseDate = moment.tz(date, 'M/D/YYYY h:mm a', timeZone).toDate();
  if (!(parseDate.getMonth()) || moment().toDate() > parseDate) req.error.message = 'Invalid Date: M/D/YYYY h:mm a, e.g: 10/25/2019 10:55 pm';
};

export const checkCountry = country => {
  // eslint-disable-next-line no-restricted-syntax
  for (const pl of places) {
    if ((pl.name.toLocaleLowerCase() === country.toLocaleLowerCase())
    || pl.code.toLocaleLowerCase() === country.toLocaleLowerCase()) {
      return pl.name;
    }
  }
  return false;
};

const checkString = (req, string, min, message) => {
  if (!(string) || !(typeof string === 'string') || (string.length < min)) {
    req.error.message = message;
  }
};

const validateTimeAndDestination = (req, trips) => {
  trips.forEach((element, index) => {
    if (trips[index - 1]) {
      if (trips[index - 1].city.toLocaleLowerCase() === element.city.toLocaleLowerCase()
      && trips[index - 1].country.toLocaleLowerCase() === element.country.toLocaleLowerCase()) {
        req.error[`contryAndCityAt${index + 1}`] = 'you can not make trip in the same destination';
      }
      if (new Date(trips[index - 1].departureTime) >= new Date(element.departureTime)) {
        req.error[`departureTime${index + 1}`] = 'your trip is too short or invalid time span';
      }
    }
  });
};

export const validateAccommodation = async (req, res, next) => {
  const { trips } = req.body;
  // eslint-disable-next-line no-restricted-syntax
  for (const trip in trips) {
    const single = trips[trip];
    if (single.accommodationId) {
      const accommodationId = (typeof single.accommodationId === 'number') ? single.accommodationId : -1;
      const acc = await db.Accommodations.findOne({ where: { id: accommodationId }, raw: true });
      if (!acc) {
        req.error[`accommodationIdAt${trip + 1}`] = 'accommodation not found';
      }
    }
  }
  if (Object.keys(req.error).length !== 0) {
    return resSend(res, 400, req.error);
  }
  next();
};

export const validateTrips = async (req, res, next) => {
  req.error = {};
  try {
    const { trips } = req.body;
    // VALIDATE THE WHOLE TRIPS
    await trips.forEach(async (element, index) => {
      // VALIDATE OR REQUIRED FIELDS
      checkString(req, element.country, 2, `invalid country at ${index + 1}`);
      checkString(req, element.city, 1, `invalid city at ${index + 1}`);
      checkString(req, element.reason, 10, `invalid reason at ${index + 1}`);
      checkDate(req, element.departureTime, req.body.timeZone);
      // VALIDATE COUNTRY
      const country = checkCountry(element.country);
      if (!country) {
        req.error[`contryAt${index + 1}`] = 'invalid country';
      } else {
        req.body.trips[index].country = country;
      }
      // CHECK IF USER TRYING TO MAKE TRIP IN SAME DESTINATION
      if (req.body.city.toLocaleLowerCase() === element.city.toLocaleLowerCase()
      && req.body.country.toLocaleLowerCase() === element.country.toLocaleLowerCase()) {
        req.error[`contryAndCityAt${index + 1}`] = 'you can not make trip in the same destination';
      }
      // CHECK IF THE RETURNTIME IS EQUIVALENT OR LESS THAN DEPARTURETIME
      if (req.body.returnTime && new Date(req.body.returnTime) <= new Date(element.departureTime)) {
        req.error[`departureTimeAt${index + 1}`] = 'returnTime can not be less than OR equal to departureTime';
      }
    });
    await validateTimeAndDestination(req, trips);
    if (Object.keys(req.error).length !== 0) throw new Error();
    next();
  } catch (err) {
    const message = (Object.keys(req.error).length === 0) ? err.message : req.error;
    return resSend(res, 400, message);
  }
};
