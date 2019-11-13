import db from '../database/models/index';

const AccommodationService = {
  async getAccommodationById(accommodationId) {
    const accommodation = await db.Accommodations.findOne({
      where: { id: accommodationId, },
      include: [{ model: db.AccommodationImages, attributes: { exclude: ['id', 'accommodationid', 'createdAt', 'updatedAt'] } }],
    });
    return accommodation;
  },

  async getAllAccommodations() {
    const image = [{ model: db.AccommodationImages, attributes: { exclude: ['id', 'accommodationid', 'createdAt', 'updatedAt'] } }];
    const accommodations = await db.Accommodations.findAll({
      include: image, });
    return accommodations;
  },

  async getAllAccommodationsByAvailability(isAvailable) {
    const image = [{ model: db.AccommodationImages, attributes: { exclude: ['id', 'accommodationid', 'createdAt', 'updatedAt'] } }];
    const accommodations = await db.Accommodations.findAll({
      where: { isAvailable }, include: image, });
    return accommodations;
  },

  async createAccommodation(accommodation) {
    const newAccommodation = await db.Accommodations.create(accommodation);
    return newAccommodation.get({ plain: true });
  },

  async updateAccommodation(newAccommodationData, accommodationid) {
    const accommodation = await this.getAccommodationById(accommodationid);
    await accommodation.update(newAccommodationData);
  },

  async deleteAccommodationById(accommodationId) {
    await db.Accommodations.destroy({
      where: { id: accommodationId, },
    });
  },

  async createAccommodationImage(imageurl, accommodationid) {
    const imageRes = await db.AccommodationImages.create({
      imageurl,
      accommodationid,
    });
    return imageRes.get({ plain: true });
  },

  async deleteAccommodationImages(accommodationId) {
    await db.AccommodationImages.destroy({
      where: { accommodationid: accommodationId, },
    });
  },
  async checkAccommodationAvailability(id) {
    return db.Accommodations.findOne({ where: { id, isAvailable: true }, raw: true });
  }
};
export default AccommodationService;

