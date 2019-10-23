import moment from 'moment-timezone';
import Check from '../utils/validator';
import sendResult from '../utils/sendResult';
import { checkStringInArray, checkDate, checkCountry } from './trips';

const validator = {
  profile(req, res, next) {
    try {
      new Check({ username: req }).str().alphaNum();
      new Check({ password: req }).str().withSpec().confirm();
      new Check({ gender: req }).str().gender();
      new Check({ dob: req }).str().alphaNum();
      new Check({ address: req }).str().min(2);
      new Check({ city: req }).str().alpha();
      new Check({ state: req }).str().alpha();
      new Check({ department: req }).str().alpha();
      next();
    } catch (error) {
      return sendResult(res, 400, error.message);
    }
  },

  signup(req, res, next) {
    try {
      new Check({ email: req }).req().email();
      new Check({ username: req }).req().min(2).alpha();
      new Check({ password: req }).req().withSpec().min(8)
        .confirm();
      next();
    } catch (error) {
      return sendResult(res, 400, error.message);
    }
  },

  accommodation(req, res, next) {
    try {
      new Check({ description: req }).str().req().min(5);
      new Check({ address: req }).str().req().min(5);
      new Check({ availableSpace: req }).str().req().min(5);
      new Check({ cost: req }).req().num();
      new Check({ services: req }).str().req().min(5);
      new Check({ amenities: req }).str().req().min(5);
      next();
    } catch (error) {
      return sendResult(res, 400, error.message);
    }
  },

  tripValidation(req, res, next) {
    let { status } = req.params;
    status = status.toLowerCase();
    if (status !== 'approve' && status !== 'reject') {
      return sendResult(res, 400, 'invalid request');
    }
    if (status === 'approve') req.params.status = 'approved';
    if (status === 'reject') req.params.status = 'rejected';
    return next();
  },

  singleReqValid(req, res, next) {
    const { requestId } = req.params;
    if (requestId.match(/[0-9]{1}/)) next();
    else return sendResult(res, 400, 'request Id should be integer');
  },

  managerValid(req, res, next) {
    const { managerId } = req.params;
    if (managerId.match(/[0-9]{1}/)) next();
    else return sendResult(res, 400, 'manager Id should be integer');
  },

  request(req, res, next) {
    req.error = {};
    try {
      new Check({ timeZone: req }).str().req().min(1);
      new Check({ trips: req }).array().req().min(1);
      new Check({ country: req }).str().req().min(2);
      new Check({ city: req }).str().req().min(1);
      // VALIDATE USER'S TIMEZONE
      const validTZ = checkStringInArray(moment.tz.names(), req.body.timeZone, 10);
      if (validTZ instanceof Array) {
        req.error.timeZone = JSON.stringify(['did you mean?', validTZ]);
        throw new Error();
      }
      // VALIDATE RETURNTIME
      if (req.body.returnDate) {
        checkDate(req, req.body.returnDate, req.body.timeZone);
      }
      // VALIDATE COUNTRY
      const country = checkCountry(req.body.country);
      if (!country) {
        req.error.country = 'invalid country';
      } else {
        req.body.country = country;
      }
      next();
    } catch (err) {
      const message = (Object.keys(req.error).length === 0) ? err.message : req.error;
      return sendResult(res, 400, message);
    }
  }

};

export default validator;
