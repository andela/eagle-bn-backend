import sendResult from '../utils/sendResult';
import Check from '../utils/validator';

const Accommodation = {
  validateAccommodation(req, res, next) {
    const valid = [
      new Check({ description: req }).str().req().min(5),
      new Check({ address: req }).str().req().min(5),
      new Check({ availableSpace: req }).str().req().min(5),
      new Check({ cost: req }).req().num(),
      new Check({ services: req }).str().req().min(5),
      new Check({ amenities: req }).str().req().min(5),
    ];
    // eslint-disable-next-line arrow-parens
    const invalid = valid.find(e => e.error);
    if (invalid) return sendResult(res, 400, invalid.error);
    return next();
  },

  checkUserSupplier(req, res, next) {
    const { userData } = req;
    if (userData.role === 'host') return next();
    return sendResult(res, 401, 'You are not authorized');
  },

  checkViewAccommodation(req, res, next) {
    const { userData } = req;
    if (userData.role === 'host' || userData.role === 'TAdmin') {
      return next();
    }
    return sendResult(res, 401, 'You are not authorized');
  },

  checkForImages(req, res, next) {
    const { files } = req;
    let imageArray = [];

    if (!files) {
      return sendResult(res, 400, 'upload at least one image');
    }

    const { images } = files;
    if (Array.isArray(images)) { imageArray = images; } else imageArray.push(images);

    // eslint-disable-next-line arrow-parens
    const wrongFile = imageArray.find(file => !file.mimetype || !file.mimetype.startsWith('image'));

    if (wrongFile) return sendResult(res, 400, 'uploaded files should be images');
    req.imageArray = imageArray;
    return next();
  }
};

export default Accommodation;
