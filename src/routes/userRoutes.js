import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController';
import email from '../controllers/email';
import checkRole from '../validation/checkRoles';
import role from '../controllers/role';
import checkAdmin from '../middlewares/checkAdminRole';
import UserMiddle from '../middlewares/userMiddlware';
import valid from '../validation';
import '../config/passport';
import isUserVerified from '../middlewares/checkIsverified';
import uploadService from '../services/upload.service';

const app = express.Router();

app.use(passport.initialize());

const { verifyToken, cloudUpload, getUserbyEmail, getUserById } = UserMiddle;
const { updateProfile, getProfile, userSubscription } = userController;

app.post('/signup', valid.signup, UserMiddle.checkuserExist, userController.signup);
app.post('/login', UserMiddle.checkloginEntries, userController.login);
app.get('/verify/:token', userController.verifyEmail);
app.post('/reset-password', UserMiddle.validateEmail, getUserbyEmail, email.sendReset);
app.patch('/reset-password/:token', UserMiddle.validatePass, email.resetPass);
app.post('/auth/facebook', passport.authenticate('facebook-token'), userController.OauthLogin);
app.post('/auth/google', passport.authenticate('google-plus-token'), userController.OauthLogin);
app.get('/profile/:id', valid.idValidate, getUserById, getProfile);
app.patch('/profile', uploadService.fileUpload, verifyToken, valid.profile, cloudUpload, updateProfile);
app.put('/role', checkRole, checkAdmin, UserMiddle.getUserbyEmail, isUserVerified, role.changeRole);
app.get('/roles', checkAdmin, role.allRole);
app.get('/email/:subscription/:token', verifyToken, userSubscription);

export default app;

