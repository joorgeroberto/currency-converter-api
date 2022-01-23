import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Currency from '../typeorm/entities/Currency';
import CurrencyRepository from '../typeorm/repositories/CurrencyRepositories';

interface IRequest {
  id: string;
  name: string;
  symbol: string;
}

class CreateCurrencyService {
  public async execute([{ id, name, symbol }: IRequest]): Promise<Currency> {
    const currencyRepository = getCustomRepository(CurrencyRepository);

    const currencyExists = await currencyRepository.findById(id);

    if (currencyExists) {
      throw new AppError('There is already one currency with this currency_code');
    }

    const currency = currencyRepository.create({
      id,
      name,
      symbol,
    });

    await currencyRepository.save(currency);

    return currency;
  }
}

export default CreateCurrencyService;
