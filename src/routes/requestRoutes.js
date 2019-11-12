
import express from 'express';
import requestController from '../controllers/requestController';
import valid from '../validation';
import { validateTrips, updateValidateTrips } from '../validation/trips';
import reqMidd from '../middlewares/requestMiddlware';
import userMidd from '../middlewares/userMiddlware';
import roles from '../middlewares/rolesMiddlewares';
import comment from '../controllers/commentController';

const app = express.Router();


const {
  checkExistingTrip,
  checkLineManager,
  checkManagerId,
  checkCommentOwner,
  checkRequestOwner } = reqMidd;
const { changeRequestStatus, getManagerRequests, search } = requestController;

const { checkManager, checkRequester } = roles;
const { checkToken, verifyToken } = userMidd;
const {
  addCommentValidation,
  editCommentValidation,
  viewCommentValidation,
  deleteCommentValidation,
  tripValidation,
  singleReqValid,
  managerValid,
  searchValidate,
} = valid;
const { addComment, viewComment, updateComment, trashComment } = comment;

app.get('/stats', [
  verifyToken,
  userMidd.getUserbyEmail,
  valid.stats,
  reqMidd.checkStats,
  requestController.stats
]);
app.get('/search', verifyToken, searchValidate, search);
app.get('/:requestId', singleReqValid, checkToken, checkExistingTrip, checkRequestOwner, requestController.getSingleRequest);
app.get('/', checkToken, checkRequester, requestController.getRequest);
app.post('/', checkToken, checkRequester, valid.request, validateTrips, requestController.postRequest);
app.get('/managers/:managerId', managerValid, checkToken, checkManager, checkManagerId, getManagerRequests);
app.patch('/:requestId/:status', singleReqValid, checkToken, checkManager, checkExistingTrip, checkLineManager, tripValidation, changeRequestStatus);
app.put('/:requestId/:tripId', verifyToken, userMidd.getUserbyEmail, valid.updateRequest, reqMidd.checkIfReqExist, reqMidd.checkIfTripExists, updateValidateTrips, requestController.updateRequest);
app.put('/:requestId/comments/:commentId', editCommentValidation, checkToken, checkExistingTrip, checkRequestOwner, checkCommentOwner, updateComment);
app.delete('/:requestId/comments/:commentId', deleteCommentValidation, checkToken, checkExistingTrip, checkRequestOwner, checkCommentOwner, trashComment);
app.post('/:requestId/comments', addCommentValidation, checkToken, checkExistingTrip, checkRequestOwner, addComment);
app.get('/:requestId/comments', viewCommentValidation, checkToken, checkExistingTrip, checkRequestOwner, viewComment);
export default app;
