import express from 'express';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import path from 'path';
import UsersController from '../controllers/users.controller';
import EmailsController from '../controllers/emails.controller';
import checkRole from '../validation/checkRoles';
import RolesController from '../controllers/roles.controller';
import UserMiddleware from '../middlewares/user.middleware';
import valid from '../validation';
import RoleMiddleware from '../middlewares/role.middleware';
import '../config/passport';

const app = express.Router();

app.use(passport.initialize());

const uploadfile = fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../temp'),
});

const { verifyToken, cloudUpload, getUserbyEmail, getUserById, isUserVerified } = UserMiddleware;
const {
  updateProfile, getProfile, userSubscription, signup, login, verifyEmail, OauthLogin,
  OauthFaceLogin
} = UsersController;
const { checkAdmin } = RoleMiddleware;

app.post('/signup', valid.signup, UserMiddleware.checkuserExist, signup);
app.post('/login', UserMiddleware.checkloginEntries, login);
app.get('/verify/:token', verifyEmail);
app.post('/reset-password', UserMiddleware.validateEmail, getUserbyEmail, EmailsController.sendReset);
app.patch('/reset-password/:token', UserMiddleware.validatePass, EmailsController.resetPass);

app.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), OauthLogin);

app.post('/auth/facebook', passport.authenticate('facebook-token'), OauthFaceLogin);
// app.post('/auth/google', passport.authenticate('google-plus-token'), OauthLogin);
app.get('/:id/profile', valid.idValidate, getUserById, getProfile);
app.patch('/profile', uploadfile, verifyToken, valid.profile, cloudUpload, updateProfile);
app.put('/role', checkRole, checkAdmin, UserMiddleware.getUserbyEmail, isUserVerified, RolesController.changeRole);
app.get('/roles', checkAdmin, RolesController.allRole);
app.get('/email/:subscription/:token', verifyToken, userSubscription);
app.patch('/logout', UserMiddleware.verifyToken, UsersController.logout);

export default app;

