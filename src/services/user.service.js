import db from '../database/models';

const UserService = {
  async getUser(condition) {
    return db.Users.findOne({ where: condition, raw: true });
  },

  async manageUserSubscription(id, receiveEmails) {
    return db.Users.update({ receiveEmails }, { where: { id } });
  },

  async getUserRole(condition) {
    return db.Users.findOne({
      where: condition,
      include: [{ model: db.Roles, attributes: { include: ['roleName'] }, raw: true }]
    });
  },

  getAllUsersRole() {
    return db.Users.findAll({
      attributes: ['id', 'fullname', 'email', 'avatar'],
      include: [{ model: db.Roles, attributes: { exclude: ['createdAt', 'updatedAt'] } }] });
  },

  async findOrCreateUser(userData, email) {
    const [data] = await db.Users.findOrCreate({
      where: { email },
      defaults: userData.user,
      raw: true
    });
    return data;
  },

  async createUser(user) {
    const result = await db.Users.create(user);
    return result.get({ plain: true });
  },

  async updateUser(data, condition) {
    const user = await db.Users.update(data, {
      where: condition, returning: true, plain: true, raw: true,
    });
    return user[1];
  },

  async getAllUsers() {
    return db.Users.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password', 'recieveEmails', 'RoleId', 'lineManager']
      },
    });
  }
};

export default UserService;
