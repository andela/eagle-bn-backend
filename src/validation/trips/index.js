/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
import moment from 'moment';
import 'moment-timezone';
import { allScores, highScores } from '../../services';
import validatePlaces from '../../utils/placeValidation';
import RequestUtil from '../../utils/request.util';
import RequestService from '../../services/request.service';
import sendResult from '../../utils/sendResult';

export const checkStringInArray = (array, string, n) => ((array.find(element => element.toLocaleLowerCase()
  === string.toLocaleLowerCase()))
    || highScores(allScores(array, string), n));

export const checkDate = (req, date, timeZone, index) => {
  const parseDate = moment.tz(date, 'M/D/YYYY h:mm a', timeZone).toDate();
  if (!(parseDate.getMonth()) || moment().toDate() > parseDate) throw new Error(`Invalid Date in trip ${index + 1}. Allowed format: M/D/YYYY h:mm a, e.g: 10/25/2019 10:55 pm`);
};

const checkString = (req, string, min, message) => {
  if (!(string) || !(typeof string === 'string') || (string.length < min)) {
    throw new Error(message);
  }
};

const checkSimilarities = (request, trip, index) => {
  if (request.city.toLocaleLowerCase() === trip.city.toLocaleLowerCase()
      && request.country.toLocaleLowerCase() === trip.country.toLocaleLowerCase()) {
    throw new Error(`you can not make trip in the same destination in trip ${index + 1}`);
  }
  // CHECK IF THE RETURNTIME IS EQUIVALENT OR LESS THAN DEPARTURETIME
  if (request.returnTime && new Date(request.returnTime) <= new Date(trip.departureTime)) {
    throw new Error(`returnTime can not be less than OR equal to departureTime in trip ${index + 1}`);
  }
};

const checkSameDestinationTrips = (trips, trip, index) => {
  if (trips[index - 1] && trips[index - 1].city) {
    if (trips[index - 1].city.toLocaleLowerCase() === trip.city.toLocaleLowerCase()
    && trips[index - 1].country.toLocaleLowerCase() === trip.country.toLocaleLowerCase()) {
      throw new Error(`you can not make trip in the same destination at trip ${index + 1}`);
    }
    if (new Date(trips[index - 1].departureTime) >= new Date(trip.departureTime)) {
      throw new Error(`your trip is too short or invalid time span at trip ${index + 1}`);
    }
  }
};

const compareTripRequest = async (trips, request) => {
  let errorFound;
  await trips.forEach(async (element, index) => {
    try {
      checkSimilarities(request, element, index);
      checkSameDestinationTrips(trips, element, index);
    } catch (err) {
      errorFound = err;
    }
  });
  return errorFound;
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

      checkSimilarities(req.body, element, index);
      checkSameDestinationTrips(trips, element, index);
    } catch (err) {
      errorFound = err;
    }
  });

  if (!errorFound) return next();
  return sendResult(res, 400, errorFound.message, errorFound.suggestions);
};

export const updateValidateTrips = async (req, res, next) => {
  const { request } = req;
  const trip = await RequestService.getOnetrip({ id: req.params.tripId });
  const trips = await RequestService.getTrips(request.id);
  try {
    if (trip) {
      const { country, city, departureTime, reason } = req.body;
      const tripToUpdate = { country, city, departureTime, reason };

      let tripValidated;
      if (country || city) {
        tripValidated = await validatePlaces(country || trip.country, city || trip.city);
        if (tripValidated.error) {
          return sendResult(res, 400, tripValidated.error, { suggestions: tripValidated.suggestions });
        }
      }

      const providedData = RequestUtil.getProvidedData(tripToUpdate);
      const entries = Object.entries(providedData);
      for (const [key, value] of entries) {
        trip[key] = value;
      }

      checkSimilarities(request, trip, trip.id);

      const sameCity = trips.find(place => place.country === tripValidated.country && place.city === tripValidated.city);

      if (sameCity) return sendResult(res, 400, 'the same destination already exists', { in: sameCity });

      const tripIndex = trips.findIndex(element => element.id === trip.id);
      if (tripIndex < 0) return sendResult(res, 400, 'this request has no trip with such Id');
      trips[tripIndex] = trip;

      const err = await compareTripRequest(trips, request);
      if (err) throw err;
      req.trips = trips;
      return next();
    } throw new Error('no trip with a given id found');
  } catch (err) {
    const requestData = { ...request, trips };
    return sendResult(res, 400, err.message, { suggestions: err.suggestions, request: requestData });
  }
};

export const updateValidateRequest = async (req, res, next) => {
  const { request } = req;
  const trips = await RequestService.getTrips(request.id);
  try {
    const { country, city, returnTime, timeZone } = req.body;
    const dataRequest = {
      country,
      city,
      returnTime,
      timeZone
    };
    if (country || city) {
      const tripValidated = await validatePlaces(country || request.country, city || request.city);
      if (tripValidated.error) {
        return sendResult(res, 400, tripValidated.error, { suggestions: tripValidated.suggestions });
      }
    }
    const providedData = RequestUtil.getProvidedData(dataRequest);
    const entries = Object.entries(providedData);
    for (const [key, value] of entries) {
      request[key] = value;
    }

    const err = await compareTripRequest(trips, request);
    if (err) throw err;
    req.trips = trips;
    return next();
  } catch (err) {
    return sendResult(res, 400, err.message, err.suggestions);
  }
};
