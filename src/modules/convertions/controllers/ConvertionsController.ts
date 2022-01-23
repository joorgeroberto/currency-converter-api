import { Request, Response } from 'express';
// import ListCurrencyService from '../services/ListCurrencyService';
import ShowConvertionService from '../services/ShowConvertionService';

export default class CurrenciesController {
  // public async index(request: Request, response: Response): Promise<Response> {
  //   const listCurrencies = new ListCurrencyService();
  //   const currencies = await listCurrencies.execute();

  //   return response.json(currencies);
  // }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showConvertion = new ShowConvertionService();
    const convertion = await showConvertion.execute({ id });

    return response.json(convertion);
  }
}
