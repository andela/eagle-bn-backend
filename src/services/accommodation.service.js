import db from '../database/models';

const AccommodationService = {
  getAccommodation: async (id) => db.Accommodations.findOne({ where: { id }, raw: true }),
  checkAccommodationAvailability: async (id) => {
    const { Accommodations } = db;
    return Accommodations.findOne({ where: { id, isAvailable: true }, raw: true });
  },
};

export default AccommodationService;
