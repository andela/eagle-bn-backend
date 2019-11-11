import path from 'path';
import helpers from '../utils/helper';
import Email from '../utils/templates/emailSender';

/**
 * @export
 * @class EmailUtil
 */
export default class EmailUtil {
  /**
   * register a new
   * @static
   * @param {String} template the template to use
   * @param {Object} notification the notification to be sent to the user
   * @memberof EmailUtil
   * @returns {Object} sendEmail
   */
  static async sendEmail(template, notification) {
    Email.send({
      template: path.join(__dirname, '../', 'utils', 'templates', 'emails', template),
      message: {
        to: notification.to,
      },
      locals: notification,
    });
  }

  /**
   * register a new
   * @static
   * @param {Object} req the request
   * @param {number} requestId the id of the request created
   * @param {string} userEmail the email of the user who created the request
   * @param {Object} user the user to send email.
   * @memberof EmailUtil
   * @returns {Object} sendEmail
   */
  static async sendNewRequestEmail(req, requestId, userEmail, user) {
    const notification = {
      req,
      title: 'New Trip Request',
      url: `/api/v1/requests/${requestId}`,
      actionMsg: 'View Trip Request',
      msg: `new trip request was initiated by ${userEmail}`,
      to: user.email,
      fullname: user.fullname,
      token: helpers.createToken(user.id, user.email),
      base: `${req.protocol}://${req.headers.host}`
    };
    await this.sendEmail('request', notification);
  }

  /**
   * register a new
   * @static
   * @param {Object} req the request
   * @param {Object} newRequest the notificion to be sent
   * @memberof EmailUtil
   * @returns {Object} sendResult
   */
  static async sendRequestedStatusUpdatedEmail(req, newRequest) {
    const notification = {
      req,
      title: `Request ${newRequest.status}`,
      url: `/api/v1/requests/${newRequest.id}`,
      actionMsg: 'View request',
      msg: `your request has been ${newRequest.status}`,
      to: req.user.email,
      fullname: req.user.fullname,
      token: helpers.createToken(req.user.id, req.user.email),
      base: `${req.protocol}://${req.headers.host}`
    };
    await this.sendEmail('request', notification);
  }

  /**
   * register a new
   * @static
   * @param {Object} req the request
   * @memberof EmailUtil
   * @returns {Object} sendResult
   */
  static async sendResetPasswordEmail(req) {
    const notification = {
      req,
      title: 'Password reset',
      url: `/api/v1/users/reset-password/${helpers.createToken(req.user.id, req.user.email)}`,
      actionMsg: 'Reset Password',
      msg: 'you requested to reset the password',
      to: req.user.email,
      fullname: req.user.fullname,
      token: helpers.createToken(req.user.id, req.user.email),
      base: `${req.protocol}://${req.headers.host}`
    };
    await this.sendEmail('password', notification);
  }

  /**
   * register a new
   * @static
   * @param {Object} req the request
   * @param {Object} user the data of the user
   * @memberof EmailUtil
   * @returns {Object} sendResult
   */
  static async sendVerificationEmail(req, user) {
    const notification = {
      req,
      title: 'Email Verification',
      url: `/api/v1/users/verify/${helpers.createToken(user.id, user.email)}`,
      actionMsg: 'Verify Email',
      msg: 'you created account',
      to: user.email,
      fullname: user.fullname,
      token: helpers.createToken(user.id, user.email),
      base: `${req.protocol}://${req.headers.host}`
    };
    await this.sendEmail('verification', notification);
  }

  /**
   * register a new
   * @static
   * @param {Object} req the request
   * @param {Object} user the data of the user
   * @memberof EmailUtil
   * @returns {Object} sendResult
   */
  static async sendRoleChangedEmail(req) {
    const notification = {
      req,
      title: 'Role Changed',
      msg: `your role has been changed to ${req.body.new_role}`,
      to: req.user.email,
      fullname: req.user.fullname,
      token: helpers.createToken(req.user.id, req.user.email),
      base: `${req.protocol}://${req.headers.host}`
    };
    await this.sendEmail('role', notification);
  }
}
