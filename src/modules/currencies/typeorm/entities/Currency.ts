import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// decorator que indica que esta classe é uma entidade e
// a tabela que esta entidade faz o mapeamento.
@Entity('currencies')
class Currency {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  symbol: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Currency;
