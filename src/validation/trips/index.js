/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
import moment from 'moment';
import 'moment-timezone';
import locations from 'countrycitystatejson';
import places from '../../services/countries.json';
import { allScores, highScores } from '../../services';
import resSend from '../../utils/sendResult';
import helper from '../../utils/requestUtils';

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

export const updateValidateTrips = async (req, res, next) => {
  try {
    const { country, city } = req.body;
    const origin = locations.getCountryByShort(country.toUpperCase());
    const { suggestions, error, names } = helper.getCityData(origin.states, city);
    if (error) {
      return resSend(res, 400, error, { suggestions });
    }
    if (!names.find(place => place === city.toLocaleLowerCase())) {
      return resSend(res, 400, `we dint find ${city} in  ${origin.name}`);
    }
    // same destination validation
    if ((req.body.city || req.body.trip.city)
    && (req.body.city.toLocaleLowerCase() || req.request.city)
    === (req.body.trip.city.toLocaleLowerCase() || req.trip.city)) {
      throw new Error('trips to the same city not allowed');
    }

    if ((req.body.returnTime || req.body.trip.departureTime)
    && new Date(req.body.returnTime || req.request.returnTime)
    <= new Date(req.body.trip.departureTime || req.request.returnTime)) {
      throw new Error('returnTime can not be less than OR equal to departureTime');
    }
    next();
  } catch (err) {
    return resSend(res, 400, err.message);
  }
};

export const validateTripsData = async (req, res, next) => {
  try {
    const { country, city, departureTime } = req.body.trip;
    // check date
    if (departureTime && !departureTime.match(/[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/)) {
      return resSend(res, 400, 'date fomart is invalid try: YYYY-M-D');
    }
    const destination = locations.getCountryByShort(country.toUpperCase());
    const { suggestions, error, names } = helper.getCityData(destination.states, city);
    if (error) {
      return resSend(res, 400, error, { suggestions });
    }

    if (!names.find(place => place === city.toLocaleLowerCase())) {
      return resSend(res, 400, `we dint find ${city} in  ${destination.name}`);
    }
    next();
  } catch (err) {
    return resSend(res, 400, err.message);
  }
};
