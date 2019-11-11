import sendResult from '../utils/sendResult';
import BookmarkService from '../services/bookmark.service';
import AccommodationService from '../services/accommodation.service';
import uploadService from '../services/upload.service';


const Accommodation = {
  async addAccommodation(req, res) {
    const {
      description, address, availableSpace, cost, amenities, services, currency, name
    } = req.body;
    const { userId } = req.userData;
    const response = await AccommodationService.createAccommodation({
      name,
      description,
      address,
      cost,
      amenities,
      services,
      userid: userId,
      availableSpace,
      currency: (currency) || 'USD',
    });
    uploadService.uploadImages(req, res, response);
  },

  async getAccommodations(req, res) {
    const accommodations = await AccommodationService.getAllAccommodations();
    return sendResult(res, 200, 'Accommodations facilities', accommodations);
  },

  async getAccommodationById(req, res) {
    const { accommodationId } = req.params;
    const accommodation = await AccommodationService.getAccommodationById(accommodationId);
    return sendResult(res, 200, 'Accommodation facility', accommodation);
  },

  async getAccommodationsByFilter(req, res) {
    const accommodations = await AccommodationService
      .getAllAccommodationsByFilter(req);
    return sendResult(res, 200, 'Accommodations facilities', accommodations);
  },

  async editAccommodation(req, res) {
    const { id } = req.params;
    const accommodation = await AccommodationService.updateAccommodation(req.body, id);
    const returnData = accommodation.get({ plain: true });
    if (req.files) {
      await AccommodationService.deleteAccommodationImages(id);
      returnData.AccommodationImages = undefined;
    }
    uploadService.uploadImages(req, res, returnData, 'Accommodation data/images updated successfully');
  },

  async deleteAccommodation(req, res) {
    await AccommodationService.deleteAccommodationById(req.params.id);
    const returnAccommo = await AccommodationService.getAccommodationById(req.params.id);

    if (!returnAccommo) {
      return sendResult(res, 200, 'The accommodation facility data has been deleted', returnAccommo);
    }
  },

  async bookmarkAccommodation(req, res) {
    const { userId } = req.userData;
    const { accommodationId } = req.params;

    const bookmarkData = { UserId: userId, AccommodationId: accommodationId };
    const result = await BookmarkService.bookmark(bookmarkData);
    const status = result[1] ? 201 : 200;
    return sendResult(res, status, 'Accommodation bookmarked Successfully');
  },

  async undoBookmark(req, res) {
    const { userId } = req.userData;
    const { accommodationId } = req.params;

    const bookmarkData = { UserId: userId, AccommodationId: accommodationId };
    await BookmarkService.undoBookmark(bookmarkData);
    return sendResult(res, 200, 'Accommodation bookmark deleted Successfully');
  },

  async getBookmarkedAccommodations(req, res) {
    const { userId } = req.userData;
    const result = await BookmarkService.getBookmarkedAccommodation(userId);
    return sendResult(res, 200, 'bookmarked accommodations', result);
  }
};
export default Accommodation;
