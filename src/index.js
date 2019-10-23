
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import morgan from 'morgan';
import setupSwagger from './utils/swaggerDefinition';
import routes from './routes/index';

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(methodOverride());

app.use('/api/v1', routes);

const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

setupSwagger(app, server.address().port);

// should be added after all routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: `${req.method}=${req.protocol}://${req.headers.host}${req.originalUrl} not found`,
  });
});

export default server;
