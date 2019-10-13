/* eslint-disable require-jsdoc */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const helper = {
  createToken(userId, email, verified) {
    return jwt.sign(
      {
        userId,
        email,
        verified
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: '24h',
      },
    );
  },
  hashPassword(password) {
    if (password) {
      return bcrypt.hashSync(password, 10, (err, hash) => hash);
    }
    return undefined;
  },
  comparePassword(password, hash) { return bcrypt.compareSync(password, hash, (err, res) => res); },
  verifyToken(token) {
    let userInfo = {};
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        userInfo = {
          error: 'unauthorized token',
        };
        return;
      }
      userInfo = decoded;
    });
    return userInfo;
  },

  getToken(req) {
    return (req.headers['x-access-token'] || req.headers.authorization
    || req.headers.Authorization || req.body.token || req.params.token);
  },

  decodeToken(token) {
    const data = jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) return { error: err.message };
      return decoded;
    });
    return data;
  },
};

export default helper;
