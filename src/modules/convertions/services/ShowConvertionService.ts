import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Convertion from '../typeorm/entities/Convertion';
import ConvertionRepositories from '../typeorm/repositories/ConvertionRepositories';

import CurrencyRepository from '@modules/currencies/typeorm/repositories/CurrencyRepositories';

interface IRequest {
  id: string;
}

class ShowConvertionService {
  public async execute({ id }: IRequest): Promise<Convertion> {
    function isNotValidId() {
      const idRGEX = /^[A-Z]{3}[_]{1}[A-Z]{3}$/;
      return !idRGEX.test(id);
    }

    if (isNotValidId()) {
      throw new AppError('One or both currencies code is not valid');
    }

    const [from, to] = id.split('_');
    async function convertionCurrenciesDoesntExists() {
      const currencyRepository = getCustomRepository(CurrencyRepository);
      const fromCurrency = await currencyRepository.findById(from);
      const toCurrency = await currencyRepository.findById(to);
      return !toCurrency || !fromCurrency;
    }

    if (await convertionCurrenciesDoesntExists()) {
      throw new AppError('One or both currencies was not found');
    }

    const convertionRepository = getCustomRepository(ConvertionRepositories);
    const convertion = await convertionRepository.findByCurrenciesCode({ to, from });

    if (!convertion) {
      throw new AppError('Convertion not found');
    }

    return convertion;
  }
}

export default ShowConvertionService;
