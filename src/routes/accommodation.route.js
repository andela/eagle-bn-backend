import express from 'express';
import BookingsController from '../controllers/bookings.controller';
import AccommodationsController from '../controllers/accommodations.controller';
import AccommodationMiddleware from '../middlewares/accommodation.middleware';
import UserMiddleware from '../middlewares/user.middleware';
import valid from '../validation';
import RoleMiddleware from '../middlewares/role.middleware';
import LikingsController from '../controllers/likings.controller';
import uploadService from '../services/upload.service';

const app = express.Router();


const {
  isSupplierAccommodation, checkForImages, checkForImagesUpdate, accommodationExists
} = AccommodationMiddleware;
const { checkToken } = UserMiddleware;

app.patch('/:id', uploadService.fileUpload, checkToken, RoleMiddleware.checkHostOrTAdmin, isSupplierAccommodation, checkForImagesUpdate, valid.editAccommodation, AccommodationsController.editAccommodation);
app.delete('/:id', checkToken, RoleMiddleware.checkHost, isSupplierAccommodation, AccommodationsController.deleteAccommodation);
app.post('/', uploadService.fileUpload, checkToken, RoleMiddleware.checkHostOrTAdmin, valid.accommodation, checkForImages, AccommodationsController.addAccommodation);
app.get('/', AccommodationsController.getAccommodations);
app.get('/:accommodationId/rating', valid.validateAccommodationId, BookingsController.getRating);
app.get('/search', AccommodationsController.getAccommodationsByFilter);
app.get('/bookmarks', checkToken, AccommodationsController.getBookmarkedAccommodations);
app.get('/:accommodationId', AccommodationsController.getAccommodationById);
app.post('/:accommodationId/like', checkToken, LikingsController.addLikeAccommdation);
app.get('/:accommodationId/like', checkToken, LikingsController.getAccommdationLikes);
app.post('/:accommodationId/bookmarks', checkToken, valid.validateAccommodationId, accommodationExists, AccommodationsController.bookmarkAccommodation);
app.delete('/:accommodationId/bookmarks', checkToken, valid.validateAccommodationId, accommodationExists, AccommodationsController.undoBookmark);
export default app;
