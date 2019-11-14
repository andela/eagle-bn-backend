import express from 'express';
import RequestsController from '../controllers/requests.controller';
import valid from '../validation';
import { validateTrips, updateValidateTrips, updateValidateRequest } from '../validation/trips';
import RequestMiddleware from '../middlewares/request.middleware';
import UserMiddleware from '../middlewares/user.middleware';
import RoleMiddleware from '../middlewares/role.middleware';
import CommentsController from '../controllers/comments.controller';

const app = express.Router();


const {
  checkExistingTrip,
  checkLineManager,
  checkManagerId,
  chekIfParentExist,
  checkCommentOwner,
  checkRequestOwner,
  checkCommentExist } = RequestMiddleware;
const { changeRequestStatus, getManagerRequests, search } = RequestsController;

const { checkManager, checkRequester } = RoleMiddleware;
const { checkToken, verifyToken } = UserMiddleware;
const {
  addCommentValidation,
  editCommentValidation,
  viewCommentValidation,
  deleteCommentValidation,
  tripValidation,
  singleReqValid,
  managerValid,
  searchValidate,
  validateTripId,
  validateRequestId
} = valid;
const { addComment, viewComment, updateComment, trashComment, getComment } = CommentsController;

app.get('/stats', [
  verifyToken,
  UserMiddleware.getUserbyEmail,
  valid.stats,
  RequestMiddleware.checkStats,
  RequestsController.stats
]);
app.get('/search', verifyToken, searchValidate, search);
app.get('/:requestId', singleReqValid, checkToken, checkExistingTrip, checkRequestOwner, RequestsController.getSingleRequest);
app.get('/', checkToken, checkRequester, RequestsController.getRequest);
app.post('/', checkToken, checkRequester, valid.request, validateTrips, RequestsController.postRequest);
app.get('/managers/:managerId', managerValid, checkToken, checkManager, checkManagerId, getManagerRequests);
app.patch('/:requestId/:status', singleReqValid, checkToken, checkManager, checkExistingTrip, checkLineManager, tripValidation, changeRequestStatus);
app.put('/:requestId/', validateRequestId, verifyToken, UserMiddleware.getUserbyEmail, valid.updateRequest, RequestMiddleware.checkIfReqExist, updateValidateRequest, RequestsController.updateRequest);
app.put('/:requestId/:tripId', validateRequestId, validateTripId, verifyToken, UserMiddleware.getUserbyEmail, valid.updateTrip, RequestMiddleware.checkIfReqExist, updateValidateTrips, RequestsController.updateTrip);
app.put('/:requestId/comments/:commentId', editCommentValidation, checkToken, checkExistingTrip, checkRequestOwner, checkCommentOwner, updateComment);
app.delete('/:requestId/comments/:commentId', deleteCommentValidation, checkToken, checkExistingTrip, checkRequestOwner, checkCommentOwner, trashComment);
app.post('/:requestId/comments', addCommentValidation, checkToken, chekIfParentExist, checkExistingTrip, checkRequestOwner, addComment);
app.get('/:requestId/comments', viewCommentValidation, checkToken, checkExistingTrip, checkRequestOwner, viewComment);
app.get('/:requestId/comments/:commentId', viewCommentValidation, checkToken, checkExistingTrip, checkCommentExist, checkRequestOwner, getComment);
export default app;
