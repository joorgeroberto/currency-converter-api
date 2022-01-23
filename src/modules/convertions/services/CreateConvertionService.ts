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

interface iData {
  xxx: string;
}

class CreateConvertionService {
  public async execute({ id }: IRequest): Promise<Convertion> {
    const [from, to] = id.split('_');

    const convertionRepository = getCustomRepository(ConvertionRepositories);
    const convertionExists = await convertionRepository.findByCurrenciesCode({ to, from });

    if (convertionExists) {
      throw new AppError('Convertion already exists!');
    }

    const yesterdayDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

    let todayValue: any;
    try {
      const { data } = await Api.get(`/convert?q=${to}_${from}&compact=ultra&apiKey=${apiToken}`);
      todayValue = data;
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError('Convertion internal error!');
      }
        throw new AppError('Convertion internal error!');
      }
    }
    // throw new AppError('SUCESSO!');

    const convertion = convertionRepository.create({
      to,
      from,
    });

    await convertionRepository.save(convertion);

    return convertion;
  }
}

export default CreateConvertionService;
