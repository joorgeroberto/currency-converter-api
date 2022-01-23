import { Request, Response } from 'express';
import CreateCurrencyService from '../services/CreateCurrencyService';
import DeleteCurrencyService from '../services/DeleteCurrencyService';
import ListCurrencyService from '../services/ListCurrencyService';
import ShowCurrencyService from '../services/ShowCurrencyService';
import UpdateCurrencyService from '../services/UpdateCurrencyService';

export default class CurrenciesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCurrencies = new ListCurrencyService();
    const currencies = await listCurrencies.execute();

    return response.json(currencies);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCurrency = new ShowCurrencyService();
    const currency = await showCurrency.execute({ id });

    return response.json(currency);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id, name, symbol } = request.body;

    const createCurrency = new CreateCurrencyService();
    const currency = await createCurrency.execute({ id, name, symbol });

    return response.json(currency);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, symbol } = request.body;

    const updateCurrency = new UpdateCurrencyService();
    const currency = await updateCurrency.execute({ id, name, symbol });

    return response.json(currency);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCurrency = new DeleteCurrencyService();
    await deleteCurrency.execute({ id });

    return response.json([]);
  }
}
