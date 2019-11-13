import sendResult from '../utils/sendResult';
import DestinationsService from '../services/destination.service';


const destinationCOntroller = {
  async getDestinations(req, res) {
    const Travelled = await DestinationsService.getAllCities();

    sendResult(res, 200, 'Destinations Travelled', Travelled);
  }
};

export default destinationCOntroller;
