/* eslint-disable require-jsdoc */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

function helper() {
  this.sendResult = async (res, status, message, data) => res.status(status).json({
    status,
    message,
    data
  });
  this.createToken = async (userId, email, userType) => jwt.sign(
    {
      userId,
      email,
      userType
    },
    process.env.authSecret,
    {
      expiresIn: '24h',
    },
  );
  this.hashPassword = async (password) => {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10, (err, hash) => hash);
      return hashedPassword;
    }
    return undefined;
  };
}
export default new helper();
