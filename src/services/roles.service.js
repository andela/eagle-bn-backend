import db from '../database/models';

const RoleService = {
  async getRole(condition) {
    const role = await db.Roles.findOne({ where: condition });
    return role;
  }
};

export default RoleService;
