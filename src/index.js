import express from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import swaggerConfig from '../swagger.json';

// Create global App project
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  return response.status(200).send({
    message: 'Welcome to Shibi app API'
  });
});

app.get('/api/v1', (request, response) => {
  return response.status(200).send({
    message: 'Welcome to Shibi api version 1'
  });
});

app.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));

app.use((request, response, next) => {
  const error = new Error('You are trying to access a wrong Route');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    status: error.status || 500,
    error: error.name,
    message: error.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${PORT}`);
});

export default app;
