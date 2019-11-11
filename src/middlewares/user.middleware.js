import sendResult from '../utils/sendResult';
import Check from '../utils/validator';
import helper from '../utils/helper';
import cloud from '../config/clound-config';
import UserService from '../services/user.service';

const User = {
  async checkuserExist(req, res, next) {
    const existingUser = await UserService.getUser({ email: req.body.email });
    if (existingUser) return sendResult(res, 409, 'This email already exists');
    next();
  },

  async checkloginEntries(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResult(res, 400, 'Both email and password are required');
    }
    next();
  },

  validateEmail(req, res, next) {
    try {
      new Check({ email: req }).req().email();
      next();
    } catch (error) {
      sendResult(res, 400, error.message);
    }
  },

  async getUserbyEmail(req, res, next) {
    const user = await UserService.getUser({ email: req.body.email || req.user.email });
    if (!user) return sendResult(res, 409, 'User with email not found');
    req.user = user;
    next();
  },

  async getUserById(req, res, next) {
    const { id } = req.params;
    const user = await UserService.getUser({ id });
    if (!user) return sendResult(res, 404, 'User with id not found');
    req.user = user;
    next();
  },

  validatePass(req, res, next) {
    try {
      new Check({ password: req }).req().min(2).withSpec()
        .confirm();
      next();
    } catch (error) {
      return sendResult(res, 400, error.message);
    }
  },

  async verifyToken(req, res, next) {
    const token = helper.getToken(req);
    if (!token) return sendResult(res, 400, 'provide token to get access');
    const userData = helper.decodeToken(token);
    const user = await UserService.getOneUser(userData.userId);
    if (user.isLogged === false) return sendResult(res, 401, 'You need to login first');
    if (userData.error) return sendResult(res, 400, userData.error);
    req.user = userData;
    next();
  },

  cloudUpload(req, res, next) {
    if (req.files || req.files !== null) {
      if (!req.files.avatar.mimetype.match(/image/g)) {
        return sendResult(res, 400, 'avatar image fomart is invalid');
      }

      cloud.uploader.upload(req.files.avatar.tempFilePath, async (result) => {
        req.imgLink = await result.url;
        next();
      });

      return;
    }
    next();
  },

  async checkToken(req, res, next) {
    const token = helper.getToken(req);
    const data = helper.verifyToken(token);
    const user = await UserService.getOneUser(data.userId);
    if (user.isLogged === false) return sendResult(res, 401, 'You need to login first');
    if (data.error) {
      return sendResult(res, 401, 'You are not authorized');
    }

    req.userData = data;
    return next();
  },

  async checkReceiverExist(req, res, next) {
    const { receiverId } = req.body;
    if (!receiverId) return next();
    const user = await UserService.getUser({ id: receiverId });
    if (user) return next();
    return sendResult(res, 400, 'this user does not exist');
  },
  async isUserVerified(req, res, next) {
    const user = await UserService.getUserRole({ email: req.body.email });
    if (!user.isverified) {
      return sendResult(res, 400, 'The user is not verified');
    }
    req.old_role = user.Role.roleName;
    next();
  }
};

export default User;
