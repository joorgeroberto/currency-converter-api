import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Currency from '../typeorm/entities/Currency';
import CurrencyRepository from '../typeorm/repositories/CurrencyRepositories';

interface IRequest {
  id: string;
  name: string;
  symbol: string;
}

class UpdateCurrencyService {
  public async execute({ id, name, symbol }: IRequest): Promise<Currency> {
    const currencyRepository = getCustomRepository(CurrencyRepository);

    const currency = await currencyRepository.findOne(id);

    if (!currency) {
      throw new AppError('Currency not found.');
    }

    const currencyExists = await currencyRepository.findByName(name);
    if (currencyExists) {
      throw new AppError('There is already one currency with this name');
    }

    currency.name = name;
    currency.symbol = symbol;

    await currencyRepository.save(currency);

    return currency;
  }
}

export default UpdateCurrencyService;
