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
  async updateUserByEmail(updateObj, email) {
    const newUser = await db.Users.update(updateObj, {
      where: { email }, returning: true, raw: true
    });
    return newUser[1][0];
  },
  async updateUserById(id, object) {
    const newUser = await db.Users.update(object, { where: { id } });
    return newUser;
  },
  getAllUsersRole() {
    return db.Users.findAll({
      attributes: ['id', 'fullname', 'email'],
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

  async getOneUser(condition) {
    const user = await db.Users.findOne({ where: condition, raw: true });
    return user;
  }

};

export default UserService;
