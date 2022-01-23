import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Currency from '../typeorm/entities/Currency';
import { CurrencyRepository } from '../typeorm/repositories/CurrencyRepositories';

interface IRequest {
  id: string;
}

class ShowCurrencyService {
  public async execute({ id }: IRequest): Promise<Currency> {
    const currencyRepository = getCustomRepository(CurrencyRepository);

    const currency = await currencyRepository.findById(id);

    if (!currency) {
      throw new AppError('Currency not found');
    }

    return currency;
  }
}

export default ShowCurrencyService;
