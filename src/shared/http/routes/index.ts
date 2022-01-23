import { Router } from 'express';
import currenciesRouter from '@modules/currencies/routes/currencies.routes';
import convertionsRouter from '@modules/convertions/routes/convertions.routes';

const routes = Router();

routes.use('/currencies', currenciesRouter);
routes.use('/convertions', convertionsRouter);

routes.get('/', (_, response) => {
  return response.json({ message: 'currency-converter-api!' });
});

export default routes;
