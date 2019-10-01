
import express from 'express';
import bodyParser from 'body-parser';
import setupSwagger from './utils/swaggerDefinition';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// need to be added after app.use(routers) to handle request not found
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: `${req.method}=${req.protocol}://${req.hostname}${req.path} not found`,
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

setupSwagger(app, server.address().port);

export default server;
