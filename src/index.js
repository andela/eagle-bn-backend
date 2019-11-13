import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import morgan from 'morgan';
import socketIo from 'socket.io';
import cors from 'cors';
import setupSwagger from './utils/swaggerDefinition';
import routes from './routes/index';
import helper from './utils/helper';

const app = express();

dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(methodOverride());

const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

setupSwagger(app, server.address().port);

const connectedClients = {};
const io = socketIo(server);
io.use((socket, next) => {
  const { token } = socket.handshake.query;
  const userData = helper.verifyToken(token);
  if (!userData.error) {
    const clientKey = Number.parseInt(userData.userId, 10);
    connectedClients[clientKey] = connectedClients[clientKey] || [];
    connectedClients[clientKey].push(socket.id);
  }
  next();
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedClients = connectedClients;
  next();
});

app.use('/api/v1', routes);
// should be added after all routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: `${req.method}=${req.protocol}://${req.headers.host}${req.originalUrl} not found`,
  });
});
// HANDLING BODY PARSER ERRORS
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(400).json({
    status: 400,
    message: `bad request: ${error.message}`
  });
});

export default server;
