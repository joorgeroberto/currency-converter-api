import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ConvertionRepositories from '../typeorm/repositories/ConvertionRepositories';

interface IRequest {
  id: string;
}

class DeleteConvertionService {
  public async execute({ id }: IRequest): Promise<void> {
    const [from, to] = id.split('_');
    const convertionRepository = getCustomRepository(ConvertionRepositories);
    const convertion = await convertionRepository.findByCurrenciesCode({ to, from });

    if (!convertion) {
      throw new AppError('Convertion not found.');
    }

    await convertionRepository.remove(convertion);
  }
}

export default DeleteConvertionService;
