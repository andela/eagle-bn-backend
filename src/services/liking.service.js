import db from '../database/models/index';
import sendResult from '../utils/sendResult';

const LikingService = {

  async likeAccommdation(req, res) {
    const { userId, accommodationId } = req;
    const [like, isCreated] = await db.Likings
      .findOrCreate({ where: { userId, accommodationId }, defaults: { isLiked: true } });

    if (isCreated) {
      return sendResult(res, 201, 'You liked the accommodation ', like);
    }
    like.update({ isLiked: !like.isLiked });
    return sendResult(res, 200, ` The accommodation like  status updated to ${like.isLiked}`, like);
  }
};
export default LikingService;
