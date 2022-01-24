import { Router } from 'express';
import ConvertionsController from '../controllers/ConvertionsController';
import { celebrate, Joi, Segments } from 'celebrate';
import verifyIdFormat from '../middlewares/verifyIdFormat';
import verifyIfCurrenciesExists from '../middlewares/verifyIfCurrenciesExists';

const convertionsRouter = Router();
const convertionsController = new ConvertionsController();

convertionsRouter.get('/', convertionsController.index);

convertionsRouter.get(
  '/:id',
  verifyIdFormat,
  verifyIfCurrenciesExists,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  convertionsController.show,
);

convertionsRouter.delete(
  '/:id',
  verifyIdFormat,
  verifyIfCurrenciesExists,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  convertionsController.delete,
);

export default convertionsRouter;
