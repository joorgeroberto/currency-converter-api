import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import moment from 'moment';
import ListConvertionService from '../services/ListConvertionService';
import ShowConvertionService from '../services/ShowConvertionService';
import ConvertionRepository from '../typeorm/repositories/ConvertionRepositories';
import CreateConvertionService from '../services/CreateConvertionService';
import DeleteConvertionService from '../services/DeleteConvertionService';

export default class CurrenciesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listConvertions = new ListConvertionService();
    const convertions = await listConvertions.execute();

    return response.json(convertions);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const [from, to] = id.split('_');

    const convertionRepository = getCustomRepository(ConvertionRepository);
    const convertion = await convertionRepository.findByCurrenciesCode({ to, from });

    if (!convertion) {
      const createConvertionService = new CreateConvertionService();
      const convertionCreated = await createConvertionService.execute({ id });

      return response.json(convertionCreated);
    }

    const duration = moment.duration(moment().diff(moment(convertion?.updated_at)));
    const isConvertionUpdated = duration.asDays() <= 1;
    console.log(duration.asDays(), isConvertionUpdated);

    if (!isConvertionUpdated) {
      const updateConvertionService = new ShowConvertionService();
      const convertion = await updateConvertionService.execute({ id });

      return response.json(convertion);
    }

    console.log('100% ATUALIZADOOO');
    const showConvertionService = new ShowConvertionService();
    const convertionShown = await showConvertionService.execute({ id });

    return response.json(convertionShown);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteConvertion = new DeleteConvertionService();
    await deleteConvertion.execute({ id });

    return response.json([]);
  }
}
