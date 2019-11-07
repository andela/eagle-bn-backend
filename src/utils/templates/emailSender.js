import nodemailer from 'nodemailer';
import Email from 'email-templates';

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const email = new Email({
  transport: transporter,
  send: true,
  preview: false,
  message: {
    from: process.env.MAIL_SERVICE,
  }
});

export default email;
