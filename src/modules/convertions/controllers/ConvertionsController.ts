import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import moment from 'moment';
// import ListCurrencyService from '../services/ListCurrencyService';
import ShowConvertionService from '../services/ShowConvertionService';
import ConvertionRepository from '../typeorm/repositories/ConvertionRepositories';
import CreateConvertionService from '../services/CreateConvertionService';

export default class CurrenciesController {
  // public async index(request: Request, response: Response): Promise<Response> {
  //   const listCurrencies = new ListCurrencyService();
  //   const currencies = await listCurrencies.execute();

  //   return response.json(currencies);
  // }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const [from, to] = id.split('_');

    const convertionRepository = getCustomRepository(ConvertionRepository);
    const convertionExists = await convertionRepository.findByCurrenciesCode({ to, from });

    if (!convertionExists) {
      const createConvertion = new CreateConvertionService();
      const convertion = await createConvertion.execute({ id });

      console.log(convertion);
      return response.json(convertion);
    }

    async function isConvertionUpdated() {
      const convertionRepository = getCustomRepository(ConvertionRepository);
      const convertion = await convertionRepository.findByCurrenciesCode({ to, from });
      const duration = moment.duration(moment().diff(moment(convertion?.updated_at)));
      const isUpdated = duration.asDays() >= 1;

      return isUpdated;
    }

    if (!isConvertionUpdated()) {
      const updateConvertion = new ShowConvertionService();
      const convertion = await updateConvertion.execute({ id });

      return response.json(convertion);
    }

    const showConvertion = new ShowConvertionService();
    const convertion = await showConvertion.execute({ id });

    return response.json(convertion);
  }
}
