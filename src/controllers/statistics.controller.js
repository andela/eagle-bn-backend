import sendResult from '../utils/sendResult';
import RequestsService from '../services/request.service';


const StatisticsController = {
  async getDestinations(req, res) {
    const travelledDestination = await RequestsService.getTraveledDestinations();

    sendResult(res, 200, 'Destinations Travelled', travelledDestination);
  }
};

export default StatisticsController;
