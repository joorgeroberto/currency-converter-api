import { Router } from 'express';
import currenciesRouter from '@modules/currencies/routes/currencies.routes';

const routes = Router();

routes.use('/currencies', currenciesRouter);

routes.get('/', (_, response) => {
  return response.json({ message: 'currency-converter-api!' });
});

export default routes;
