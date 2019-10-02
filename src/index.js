import express from 'express';
import bodyParser from 'body-parser';
import setupSwagger from './utils/swaggerDefinition';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});
setupSwagger(app, server.address().port);

export default app;
