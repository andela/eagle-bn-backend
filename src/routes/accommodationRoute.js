import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import BookingsController from '../controllers/bookings.controller';
import AccommodationsController from '../controllers/accommodationController';
import AccommodationMiddleware from '../middlewares/accommodation.middleware';
import UserMiddleware from '../middlewares/userMiddlware';
import valid from '../validation';
import RoleMiddleware from '../middlewares/rolesMiddlewares';
import LikingsController from '../controllers/likings.controller';

const app = express.Router();

const fUpload = fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../temp'),
});

const {
  isSupplierAccommodation, checkForImages, checkForImagesUpdate
} = AccommodationMiddleware;
const { checkToken } = UserMiddleware;

app.patch('/:id', fUpload, checkToken, RoleMiddleware.checkHostOrTAdmin, isSupplierAccommodation, checkForImagesUpdate, valid.editAccommodation, AccommodationsController.editAccommodation);
app.delete('/:id', checkToken, RoleMiddleware.checkHost, isSupplierAccommodation, AccommodationsController.deleteAccommodation);
app.post('/', fUpload, checkToken, RoleMiddleware.checkHostOrTAdmin, valid.accommodation, checkForImages, AccommodationsController.addAccommodation);
app.get('/', AccommodationsController.getAccommodations);
app.get('/:accommodationId/rating', valid.getReviewvalidation, BookingsController.getRating);
app.get('/search', AccommodationsController.getAccommodationsByFilter);
app.get('/:accommodationId', AccommodationsController.getAccommodationById);
app.post('/:accommodationId/like', [
  checkToken,
  LikingsController.addLikeAccommdation
]);
app.get('/:accommodationId/like', [
  checkToken,
  LikingsController.getAccommdationLikes
]);


export default app;
