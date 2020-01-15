/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
import { allScores, highScores } from '../../services';
import resSend from '../../utils/sendResult';
import validatePlaces from '../../utils/placeValidation';

export const checkStringInArray = (array, string, n) => ((array.find(element => element.toLocaleLowerCase()
  === string.toLocaleLowerCase()))
    || highScores(allScores(array, string), n));

export const checkDate = (req, date, timeZone, index) => {
  if (!(new Date(date) > new Date())) { throw new Error(`Invalid Date in trip ${index + 1}. it should not be in the past`); }
};

const checkString = (req, string, min, message) => {
  if (!(string) || !(typeof string === 'string') || (string.length < min)) {
    throw new Error(message);
  }
};


export const validateTrips = async (req, res, next) => {
  req.error = {};
  const { trips } = req.body;
  // VALIDATE THE WHOLE TRIPS
  let errorFound;
  await trips.forEach(async (element, index) => {
    try {
      // VALIDATE OR REQUIRED FIELDS
      checkString(req, element.country, 2, `country is required and should contains more than 2 characters in trip ${index + 1}`);
      checkString(req, element.city, 1, `city is required and should contains more than 2 characters in trip ${index + 1}`);
      checkString(req, element.reason, 5, `reason is required and should contains more than 4 characters in trip ${index + 1}`);
      checkDate(req, element.departureTime, req.body.timeZone, index);
      // VALIDATE COUNTRY
      const { error, suggestions, city, country } = await validatePlaces(element.country, element.city);
      if (error) {
        const err = new Error(`${error} in trip ${index + 1}`);
        err.suggestions = suggestions;
        throw err;
      }
      req.body.trips[index].country = country;
      req.body.trips[index].city = city;
      // CHECK IF USER TRYING TO MAKE TRIP IN SAME DESTINATION
      if (req.body.city.toLocaleLowerCase() === element.city.toLocaleLowerCase()
      && req.body.country.toLocaleLowerCase() === element.country.toLocaleLowerCase()) {
        throw new Error(`you can not make trip in the same destination in trip ${index + 1}`);
      }
      // CHECK IF THE RETURNTIME IS EQUIVALENT OR LESS THAN DEPARTURETIME
      if (req.body.returnTime && new Date(req.body.returnTime) <= new Date(element.departureTime)) {
        throw new Error(`returnTime can not be less than OR equal to departureTime in trip ${index + 1}`);
      }

      // CHECK SAME DESTINATION
      if (trips[index - 1] && trips[index - 1].city) {
        if (trips[index - 1].city.toLocaleLowerCase() === element.city.toLocaleLowerCase()
          && trips[index - 1].country.toLocaleLowerCase() === element.country.toLocaleLowerCase()) {
          throw new Error(`you can not make trip in the same destination at trip ${index + 1}`);
        }
        if (new Date(trips[index - 1].departureTime) >= new Date(element.departureTime)) {
          throw new Error(`your trip is too short or invalid time span at trip ${index + 1}`);
        }
      }
    } catch (err) {
      errorFound = err;
    }
  });

  if (!errorFound) return next();
  return resSend(res, 400, errorFound.message, errorFound.suggestions);
};

export const updateValidateTrips = async (req, res, next) => {
  try {
    const { trip, returnTime } = req.body;

    const { error, suggestions, city } = await validatePlaces(req.body.country, req.body.city);
    if (error) {
      return resSend(res, 400, error, { suggestions });
    }
    const tripValidated = await validatePlaces(trip.country, trip.city);
    if (tripValidated.error) {
      return resSend(res, 400, tripValidated.error, { suggestions: tripValidated.suggestions });
    }
    // same destination validation
    if ((city || tripValidated.city) && (city || req.request.city) === (tripValidated.city || req.trip.city)) {
      throw new Error('trips to the same city not allowed');
    }
    const timeToReturn = returnTime || req.request.returnTime;
    if (timeToReturn && (timeToReturn || trip.departureTime) && new Date(timeToReturn)
    <= new Date(trip.departureTime || req.trip.departureTime)) {
      throw new Error('returnTime can not be less than OR equal to departureTime');
    }
    next();
  } catch (error) {
    if (error.message.match(/null/g)) error.message = 'invalid origin country';
    return resSend(res, 400, error.message);
  }
};
