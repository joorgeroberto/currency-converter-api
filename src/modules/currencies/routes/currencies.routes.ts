import { Router } from 'express';
import CurrenciesController from '../controllers/CurrenciesController';
import { celebrate, Joi, Segments } from 'celebrate';

const currenciesRouter = Router();
const currenciesController = new CurrenciesController();

// Não iremos definir a rota (tipo /currencies) aqui
// pois isso será feito no arquivo 'routes' principal da aplicação.
currenciesRouter.get('/', currenciesController.index);

currenciesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  currenciesController.show,
);

currenciesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      symbol: Joi.string().required(),
    },
  }),
  currenciesController.create,
);

currenciesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      symbol: Joi.string().required(),
    },
  }),
  currenciesController.update,
);

currenciesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  currenciesController.delete,
);

export default currenciesRouter;
