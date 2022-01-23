import { EntityRepository, Repository } from 'typeorm';
import Currency from '../entities/Currency';

@EntityRepository(Currency)
class CurrencyRepository extends Repository<Currency> {
  public async findById(id: string): Promise<Currency | undefined> {
    const currency = this.findOne({
      where: { id },
    });

    return currency;
  }

  public async findByName(name: string): Promise<Currency | undefined> {
    const currency = this.findOne({
      where: { name },
    });

    return currency;
  }
}

export default CurrencyRepository;
