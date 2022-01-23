import { EntityRepository, Repository } from 'typeorm';
import Convertion from '../entities/Convertion';

interface ICode {
  to: string;
  from: string;
}

@EntityRepository(Convertion)
class ConvertionRepository extends Repository<Convertion> {
  public async findByCurrenciesCode({ to, from }: ICode): Promise<Convertion | undefined> {
    const convertion = this.findOne({
      where: { to, from },
    });

    return convertion;
  }
}

export default ConvertionRepository;
