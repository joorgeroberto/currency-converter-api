import { getCustomRepository } from 'typeorm';
import Currency from '../typeorm/entities/Currency';
import CurrencyRepository from '../typeorm/repositories/CurrencyRepositories';

class ListCurrencyService {
  public async execute(): Promise<Currency[]> {
    const currencyRepository = getCustomRepository(CurrencyRepository);

    const currency = await currencyRepository.find();

    return currency;
  }
}

export default ListCurrencyService;
