import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CurrencyRepository from '../typeorm/repositories/CurrencyRepositories';

interface IRequest {
  id: string;
}

class DeleteCurrencyService {
  public async execute({ id }: IRequest): Promise<void> {
    const currencyRepository = getCustomRepository(CurrencyRepository);

    const currency = await currencyRepository.findOne(id);

    if (!currency) {
      throw new AppError('Currency not found.');
    }

    await currencyRepository.remove(currency);
  }
}

export default DeleteCurrencyService;
