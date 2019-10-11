import nodemailer from 'nodemailer';
import msgHelper from '../utils/emailHelper';

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const msg = (user, helper) => {
  const from = process.env.MAIL_SERVICE;
  const { subject, html } = msgHelper(user, helper);
  return { from, subject, html };
};

export { msg, transporter };
