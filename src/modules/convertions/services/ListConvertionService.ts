import { getCustomRepository } from 'typeorm';
import Convertion from '../typeorm/entities/Convertion';
import ConvertionRepositories from '../typeorm/repositories/ConvertionRepositories';

class ListConvertionService {
  public async execute(): Promise<Convertion[]> {
    const convertionRepository = getCustomRepository(ConvertionRepositories);

    const convertion = await convertionRepository.find();

    return convertion;
  }
}

export default ListConvertionService;
