/* eslint-disable no-useless-escape */
import check from '../utils/optionalValidator';
import sendResult from '../utils/sendResult';

const validator = {
  profile(req, res, next) {
    try {
      check.obj({ username: req }).alfaNum();
      check.obj({ password: req }).withSpec().confirm();
      check.obj({ gender: req }).gender();
      check.obj({ dob: req }).alfaNum();
      check.obj({ address: req }).alfaNum();
      check.obj({ country: req }).alfa();
      check.obj({ language: req }).alfa();
      check.obj({ currency: req }).alfa();
      check.obj({ company: req }).alfa();
      check.obj({ department: req }).alfa();
      check.obj({ line_manager: req }).alfa();
      return next();
    } catch (error) {
      return sendResult(res, 400, error.message);
    }
  }
};

export default validator;
