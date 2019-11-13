import express from 'express';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import path from 'path';
import UserController from '../controllers/users.controller';
import email from '../controllers/emails.controller';
import checkRole from '../validation/checkRoles';
import role from '../controllers/roles.controller';
import UserMiddle from '../middlewares/user.middleware';
import valid from '../validation';
import RoleMiddleware from '../middlewares/role.middleware';
import '../config/passport';

const app = express.Router();

app.use(passport.initialize());

const uploadfile = fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../temp'),
});

const { verifyToken, cloudUpload, getUserbyEmail, getUserById, isUserVerified } = UserMiddle;
const {
  updateProfile, getProfile, userSubscription, signup, login, verifyEmail, OauthLogin,
} = UserController;
const { checkAdmin } = RoleMiddleware;

app.post('/signup', valid.signup, UserMiddle.checkuserExist, signup);
app.post('/login', UserMiddle.checkloginEntries, login);
app.get('/verify/:token', verifyEmail);
app.post('/reset-password', UserMiddle.validateEmail, getUserbyEmail, email.sendReset);
app.patch('/reset-password/:token', UserMiddle.validatePass, email.resetPass);
app.post('/auth/facebook', passport.authenticate('facebook-token'), OauthLogin);
app.post('/auth/google', passport.authenticate('google-plus-token'), OauthLogin);
app.get('/:id/profile', valid.idValidate, getUserById, getProfile);
app.patch('/profile', uploadfile, verifyToken, valid.profile, cloudUpload, updateProfile);
app.put('/role', checkRole, checkAdmin, UserMiddle.getUserbyEmail, isUserVerified, role.changeRole);
app.get('/roles', checkAdmin, role.allRole);
app.get('/email/:subscription/:token', verifyToken, userSubscription);

export default app;

