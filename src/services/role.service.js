import db from '../database/models';

const RoleService = {
  async getRole(condition) {
    return db.Roles.findOne({ where: condition, raw: true });
  }
};

export default RoleService;
