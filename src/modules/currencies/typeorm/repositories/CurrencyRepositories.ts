import { EntityRepository, Repository } from 'typeorm';
import Currency from '../entities/Currency';

@EntityRepository(Currency)
export class CurrencyRepository extends Repository<Currency> {
  public async findById(id: string): Promise<Currency | undefined> {
    // Vai retornar o primeiro registro onde o currency_code vai ser identico
    // ao name passado no patametro da classe.
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
