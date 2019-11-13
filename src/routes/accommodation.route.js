import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import BookingsController from '../controllers/bookings.controller';
import AccommodationsController from '../controllers/accommodations.controller';
import AccommodationMiddleware from '../middlewares/accommodation.middleware';
import UserMiddleware from '../middlewares/user.middleware';
import valid from '../validation';
import RoleMiddleware from '../middlewares/role.middleware';
import LikingsController from '../controllers/likings.controller';

const app = express.Router();

const fUpload = fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../temp'),
});

const {
  isSupplierAccommodation, checkForImages, checkForImagesUpdate, accommodationExists
} = AccommodationMiddleware;
const { checkToken } = UserMiddleware;

app.patch('/:id', fUpload, checkToken, RoleMiddleware.checkHostOrTAdmin, isSupplierAccommodation, checkForImagesUpdate, valid.editAccommodation, AccommodationsController.editAccommodation);
app.delete('/:id', checkToken, RoleMiddleware.checkHost, isSupplierAccommodation, AccommodationsController.deleteAccommodation);
app.post('/', fUpload, checkToken, RoleMiddleware.checkHostOrTAdmin, valid.accommodation, checkForImages, AccommodationsController.addAccommodation);
app.get('/', AccommodationsController.getAccommodations);
app.get('/:accommodationId/rating', valid.validateAccommodationId, BookingsController.getRating);
app.get('/search', AccommodationsController.getAccommodationsByFilter);
app.get('/bookmarked', checkToken, AccommodationsController.getBookmarkedAccommodations);
app.get('/:accommodationId', AccommodationsController.getAccommodationById);
app.post('/:accommodationId/like', checkToken, LikingsController.addLikeAccommdation);
app.post('/:accommodationId/bookmark', checkToken, valid.validateAccommodationId, accommodationExists, AccommodationsController.bookmarkAccommodation);
app.delete('/:accommodationId/bookmark', checkToken, valid.validateAccommodationId, accommodationExists, AccommodationsController.undoBookmark);
export default app;
