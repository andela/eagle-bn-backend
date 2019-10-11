import transporter from '../config';

export default async (to, from, subject, html) => transporter.sendMail(
  {
    to, from, subject, html,
  },
  (error) => {
    if (error) throw error;
  }
);
