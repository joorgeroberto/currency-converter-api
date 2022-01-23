import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Currency from '../typeorm/entities/Currency';
import { CurrencyRepository } from '../typeorm/repositories/CurrencyRepositories';

// Interface para "tipar" as informações que recebemos na requisição.
// Interfaces, por convenção, começam com I maiúsculo.
interface IRequest {
  id: string;
  name: string;
  symbol: string;
}

// Cada serviço, deve ter apenas uma responsabilidade (um único método).
// Serviços são relacionados as regras de negócio da aplicação
// (Regras de criar produto, deletar, etc)
class CreateCurrencyService {
  // A principio, poderiamos utilizar assim:
  // public async execute(data: IRequest): Promise<Product> {}

  // Mas, iremos desestruturar para simplificar nosso código:
  public async execute({ id, name, symbol }: IRequest): Promise<Currency> {
    // Buscando um repositorio customizado.
    const currencyRepository = getCustomRepository(CurrencyRepository);

    // Com isto, temos acesso a todos os métodos deste repositório.
    // Iremos utilizar o findByName criado anteriormente para verificar se um produto existe.
    // Senão existir, poderemos criar um produto com este nome.
    const currencyExists = await currencyRepository.findById(id);

    if (currencyExists) {
      throw new AppError('There is already one currency with this currency_code');
    }

    // Create não precisa de await pois não é um método assíncrono.
    const currency = currencyRepository.create({
      id,
      name,
      symbol,
    });

    await currencyRepository.save(currency);

    return currency;
  }
}

export default CreateCurrencyService;
