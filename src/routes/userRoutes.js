import express from 'express';
import passport from 'passport';
import '../config/passport';
import userController from '../controllers/userController';
import signupValidator from '../validation/signupValidation';
import email from '../controllers/email';
import UserMiddle from '../middlewares/userMiddlware';

const app = express.Router();

app.use(passport.initialize());

/**
 * @swagger
 * /users/signup:
 *   post:
 *     description: Signup
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user to be created
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - email
 *            - password
 *            - confirmPassword
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            confirmPassword:
 *              type: string
 *     responses:
 *       201:
 *         description: Account created successfuly
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/User'
 *             msg:
 *               type: string
 *       400:
 *         description: Wrong data sent
 *       409:
 *         description: An account with the same email exists
 */
/**
 * @swagger
 * /users/login:
 *   post:
 *     description: Login
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user to login with email and password
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: User logged successfuly
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: '#/definitions/login'
 *             msg:
 *               type: string
 *       401:
 *         description: login faild. invalid data !!
 */
/**
 * @swagger
 * /users/verify/{token}:
 *   get:
 *     description: verify email
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: token
 *        description: The token
 *     responses:
 *       200:
 *         description: email verified successfully
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *       400:
 *         description: Wrong data sent
 */
/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     description: resetPassword
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: body
 *        email: email
 *        description: Should send password reset instructions
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              type: string
 *     responses:
 *       201:
 *         description: Password reset instructions sent to user email
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *       400:
 *         description: bad request
 */
/**
 * @swagger
 * /users/reset-password:
 *   patch:
 *     description: resetPassword
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: body
 *        password: password
 *        confirmPassword: ConfirmPassword
 *        description: Should successfully reset password
 *        schema:
 *          type: object
 *          required:
 *            - password: password
 *            - confirmPassword: confirmPassword
 *          properties:
 *            password:
 *              type: string
 *            confirmPassword:
 *              type: string
 *     responses:
 *       201:
 *         description: Confirm password and Reset
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *       400:
 *         description: bad request
 */
/**
*@swagger
* /users/auth/facebook:
*    post:
*      description: ''
*      summary: google login
*      tags:
*      - Social Login
*      operationId: GooglePost
*      deprecated: false
*      produces:
*      - application/json
*      parameters:
*      - name: Content-Type
*        in: header
*        required: true
*        type: string
*        description: ''
*      - name: Body
*        in: body
*        required: true
*        description: ''
*        schema:
*          $ref: '#/definitions/facebookloginrequest'
*      responses:
*        200:
*          description: ''
*          headers: {}
*facebookloginrequest:
*    title: facebookloginrequest
*    example:
*      access_token: string
*    type: object
*    properties:
*      access_token:
*        type: string
*    required:
*    - access_token
*/
/**
*@swagger
* /users/auth/google:
*    post:
*      description: 'TODO: Add Description'
*      summary: google login
*      tags:
*      - Google Login
*      operationId: GooglePost
*      deprecated: false
*      produces:
*      - application/json
*      parameters:
*      - name: Content-Type
*        in: header
*        required: true
*        type: string
*        description: ''
*      - name: Body
*        in: body
*        required: true
*        description: ''
*        schema:
*          $ref: '#/definitions/googleloginrequest'
*      responses:
*        200:
*          description: ''
*          headers: {}
*definitions:
*    googleloginrequest:
*      title: googleloginrequest
*      example:
*        access_token: string
*      type: object
*      properties:
*        access_token:
*          type: string
*      required:
*      - access_token
*/
app.post('/signup', signupValidator, UserMiddle.checkuserExist, userController.signup);
app.post('/login', UserMiddle.checkloginEntries, userController.login);
app.get('/verify/:token', userController.verifyEmail);
app.post('/reset-password', UserMiddle.validateEmail, UserMiddle.getUserbyEmail, email.sendReset);
app.patch('/reset-password/:token', UserMiddle.validatePass, email.resetPass);
app.post('/auth/facebook', passport.authenticate('facebook-token'), userController.OauthLogin);
app.post('/auth/google', passport.authenticate('google-plus-token'), userController.OauthLogin);
export default app;
