import db from '../database/models/index';


const findUser = async (req) => {
  const user = await db.Roles.findOne({ where: { roleValue: req.body.new_role }, raw: true });

  return user;
};

export default findUser;
