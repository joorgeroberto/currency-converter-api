import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Convertion from '../typeorm/entities/Convertion';
import ConvertionRepositories from '../typeorm/repositories/ConvertionRepositories';

import moment from 'moment';

import Api from '@config/Api';
import apiToken from '@config/apiToken';

interface IRequest {
  id: string;
}

class ShowConvertionService {
  public async execute({ id }: IRequest): Promise<Convertion> {
    const [from, to] = id.split('_');

    const convertionRepository = getCustomRepository(ConvertionRepositories);
    const convertion = await convertionRepository.findByCurrenciesCode({ to, from });

    // if (!convertion) {
    //   const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

    //   const todayValue = await Api.get(`/convert?q=${to}_${from}&compact=ultra&apiKey=${apiToken}`);
    //   const yesterdayValue = await Api.get(
    //     `/convert?q=${to}_${from}&compact=ultra&apiKey=${apiToken}&date=${yesterday}`,
    //   );
    //   console.log(todayValue.data, yesterdayValue.data);
    //   throw new AppError('Convertion not found');
    // }

    if (!convertion) {
      throw new AppError('Convertion not found');
    }

    return convertion;
  }
}

export default ShowConvertionService;
