import request from 'request';
import sendResult from '../utils/sendResult';

export default async (req, res) => {
  try {
    const { from, to, money } = req.body;
    const url = `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&symbols=${from},${to}`;
    request.get(
      url,
      (err, response, body) => {
        body = JSON.parse(body);
        const converted = money * (body.rates[to] / body.rates[from]);
        sendResult(
          res, 201, 'money',
          {
            from: `${money} ${from}`,
            to: `${converted} ${to}`,
          }
        );
      }
    );
  } catch (error) {
    sendResult(res, 400, error.message);
  }
};
