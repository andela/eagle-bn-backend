import db from '../database/models';

const UserService = {
  getUser: async (condition) => db.Users.findOne({ where: condition, raw: true }),
  manageUserSubscription: async (id, receiveEmails) => db.Users.update(
    { receiveEmails },
    { where: { id } },
  ),
};

export default UserService;
