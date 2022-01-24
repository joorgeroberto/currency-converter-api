import Api from '@config/Api';
import apiToken from '@config/apiToken';
import AppError from '@shared/errors/AppError';
import moment from 'moment';
import { getCustomRepository } from 'typeorm';
import Convertion from '../typeorm/entities/Convertion';
import ConvertionRepositories from '../typeorm/repositories/ConvertionRepositories';

interface IRequest {
  id: string;
}

class CreateConvertionService {
  public async execute({ id }: IRequest): Promise<Convertion> {
    const [from, to] = id.split('_');

    const convertionRepository = getCustomRepository(ConvertionRepositories);
    const convertionExists = await convertionRepository.findByCurrenciesCode({ to, from });

    if (convertionExists) {
      throw new AppError('Convertion already exists!');
    }

    let todayValue: number;
    try {
      const { data } = await Api.get<any>(
        `/convert?q=${to}_${from}&compact=ultra&apiKey=${apiToken}`,
      );
      todayValue = data[Object.keys(data)[0]];
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError('Convertion internal error!');
      }
      throw new AppError('Convertion internal error!');
    }

    let yesterdayValue: number;
    const yesterdayDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

    try {
      const { data } = await Api.get<any>(
        `/convert?q=${to}_${from}&compact=ultra&apiKey=${apiToken}&date=${yesterdayDate}`,
      );
      const auxValue = data[Object.keys(data)[0]];
      yesterdayValue = auxValue[Object.keys(auxValue)[0]];
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError('Convertion internal error!');
      }
      throw new AppError('Convertion internal error!');
    }
    const convertion = convertionRepository.create({
      to,
      from,
      today_value: todayValue,
      yesterday_value: yesterdayValue,
    });

    await convertionRepository.save(convertion);

    return convertion;
  }
}

export default CreateConvertionService;
