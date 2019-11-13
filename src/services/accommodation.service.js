import Sequelize from 'sequelize';
import db from '../database/models/index';

const { Op } = Sequelize;

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

  async getAllAccommodationsByFilter(req) {
    const { isAvailable, address, name, costLessOr, costGreaterOr, services } = req.query;
    const condition = {};
    if (isAvailable) condition.isAvailable = isAvailable;
    if (address) condition.address = { [Op.startsWith]: address };
    if (services) condition.services = { [Op.startsWith]: services };
    if (name) condition.name = { [Op.startsWith]: name };
    if (costLessOr) condition.cost = { [Op.lte]: costLessOr };
    if (costGreaterOr) condition.cost = { [Op.gte]: costGreaterOr };

    const image = [{ model: db.AccommodationImages, attributes: { exclude: ['id', 'accommodationid', 'createdAt', 'updatedAt'] } }];
    const accommodations = await db.Accommodations.findAll({
      where: condition, include: image, });
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

