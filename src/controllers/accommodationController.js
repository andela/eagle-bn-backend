import sendResult from '../utils/sendResult';
import db from '../database/models/index';
import cloudinary from '../config/clound-config';

let success = 0;
let failure = 0;

const checkIfAllUploaded = (total, res, data) => {
  if (success + failure === total) return sendResult(res, 201, 'created successfuly', data);
};

const uploadImages = (req, res, data) => {
  const numberofImages = req.imageArray.length;
  data.images = [];
  req.imageArray.forEach((element) => {
    cloudinary.uploader.upload(element.tempFilePath, async (result, error) => {
      if (error) { failure += 1; checkIfAllUploaded(numberofImages, res, data); }

      const imageRes = await db.AccommodationImages.create({
        imageurl: result.url,
        accommodationid: data.id,
      });
      data.images.push(imageRes.imageurl);
      success += 1;
      checkIfAllUploaded(numberofImages, res, data);
    });
  });
};

const Accommodation = {
  async addAccommodation(req, res) {
    const {
      description, address, availableSpace, cost, amenities, services
    } = req.body;
    const { userId } = req.userData;
    const response = await db.Accommodations.create({
      description,
      address,
      cost,
      amenities,
      services,
      userid: userId,
      availableSpace,
    });
    const accommodation = response.get({ plain: true });
    uploadImages(req, res, accommodation);
  },

  async getAccommodation(req, res) {
    const { role, userId } = req.userData;

    if (role === 'host') {
      const accommodations = await db.Accommodations.findAll({
        where: { userid: userId },
        include: [{ model: db.AccommodationImages, attributes: { exclude: ['id', 'accommodationid', 'createdAt', 'updatedAt'] } }],
      });

      return sendResult(res, 200, 'my accommodations', accommodations);
    }

    const accommodations = await db.Accommodations.findAll();
    return sendResult(res, 200, 'all accommodations', accommodations);
  },

};
export default Accommodation;
