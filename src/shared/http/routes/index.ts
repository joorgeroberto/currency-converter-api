import { Router } from 'express';

const routes = Router();

routes.get('/', (_, response) => {
  return response.json({ message: 'currency-converter-api!' });
});

export default routes;
