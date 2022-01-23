import { Router } from 'express';
import ConvertionsController from '../controllers/ConvertionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const convertionsRouter = Router();
const convertionsController = new ConvertionsController();

// convertionsRouter.get('/', convertionsController.index);

convertionsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  convertionsController.show,
);

export default convertionsRouter;
