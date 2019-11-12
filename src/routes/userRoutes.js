import express from 'express';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import path from 'path';
import userController from '../controllers/userController';
import email from '../controllers/email';
import checkRole from '../validation/checkRoles';
import role from '../controllers/role';
import checkAdmin from '../middlewares/checkAdminRole';
import UserMiddle from '../middlewares/userMiddlware';
import valid from '../validation';
import '../config/passport';
import isUserVerified from '../middlewares/checkIsverified';

const app = express.Router();

app.use(passport.initialize());

const uploadfile = fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../temp'),
});

const { verifyToken, cloudUpload, getUserbyEmail } = UserMiddle;
const { updateProfile, getProfile, userSubscription } = userController;

app.post('/signup', valid.signup, UserMiddle.checkuserExist, userController.signup);
app.post('/login', UserMiddle.checkloginEntries, userController.login);
app.get('/verify/:token', userController.verifyEmail);
app.post('/reset-password', UserMiddle.validateEmail, UserMiddle.getUserbyEmail, email.sendReset);
app.patch('/reset-password/:token', UserMiddle.validatePass, email.resetPass);
app.post('/auth/facebook', passport.authenticate('facebook-token'), userController.OauthLogin);
app.post('/auth/google', passport.authenticate('google-plus-token'), userController.OauthLogin);
app.get('/profile', verifyToken, getUserbyEmail, getProfile);
app.patch('/profile', uploadfile, verifyToken, valid.profile, cloudUpload, updateProfile);
app.put('/role', checkRole, checkAdmin, UserMiddle.getUserbyEmail, isUserVerified, role.changeRole);
app.get('/roles', checkAdmin, role.allRole);
app.get('/email/:subscription/:token', verifyToken, userSubscription);

export default app;

