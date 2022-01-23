import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CurrencyRepository from '@modules/currencies/typeorm/repositories/CurrencyRepositories';

import AppError from '@shared/errors/AppError';

export default async function verifyIfCurrenciesExists(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.params;
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
  return next();
}
