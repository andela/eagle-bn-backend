import express from 'express';
import requestController from '../controllers/requestController';
import valid from '../validation';
import { validateTrips, validateAccommodation } from '../validation/trips';
import reqMidd from '../middlewares/requestMiddlware';
import userMidd from '../middlewares/userMiddlware';
import roles from '../middlewares/rolesMiddlewares';

const app = express.Router();

const { checkExistingTrip, checkLineManager, checkManagerId, checkTripOwner } = reqMidd;
const { changeRequestStatus, getManagerRequests } = requestController;
const { checkManager, checkRequester } = roles;
const { checkToken } = userMidd;
const { tripValidation, singleReqValid, managerValid } = valid;

app.get('/:requestId', singleReqValid, checkToken, checkExistingTrip, checkTripOwner, requestController.getSingleRequest);
app.get('/', checkToken, checkRequester, requestController.getRequest);
/* eslint-disable max-len */
app.post('/', checkToken, checkRequester, valid.request, validateTrips, validateAccommodation, requestController.postRequest);
app.get('/managers/:managerId', managerValid, checkToken, checkManager, checkManagerId, getManagerRequests);
app.patch('/:requestId/:status', singleReqValid, checkToken, checkManager, checkExistingTrip, checkLineManager, tripValidation, changeRequestStatus);

export default app;
