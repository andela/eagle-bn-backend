import sendResult from '../utils/sendResult';
import cloudinary from '../config/clound-config';
import BookmarkService from '../services/bookmark.service';
import AccommodationService from '../services/accommodation.service';

let success = 0;
let failure = 0;

const checkIfAllUploaded = (total, res, data, msg) => {
  if (success + failure === total) return sendResult(res, 201, msg, data);
};

const uploadImages = (req, res, data, msg) => {
  if (!req.imageArray) return sendResult(res, 200, msg, data);
  const numberofImages = req.imageArray.length;
  data.images = [];
  req.imageArray.forEach((element) => {
    cloudinary.uploader.upload(element.tempFilePath, async (result, error) => {
      if (error) { failure += 1; checkIfAllUploaded(numberofImages, res, data, msg); }

      const imageRes = await AccommodationService.createAccommodationImage(result.url, data.id);
      data.images.push(imageRes.imageurl);
      success += 1;
      checkIfAllUploaded(numberofImages, res, data, msg);
    });
  });
};

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
    uploadImages(req, res, response);
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
    await AccommodationService.updateAccommodation(req.body, id);
    if (req.files) {
      await AccommodationService.deleteAccommodationImages(id);
    }
    const returnData = await AccommodationService.getAccommodationById(id);
    uploadImages(req, res, returnData, 'Accommodation data/images updated successfully');
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
