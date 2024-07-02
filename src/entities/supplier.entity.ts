import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductItem } from './productIteam.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  company: string;

  @OneToMany(() => ProductItem, (productItem) => productItem.supplier)
  @JoinColumn({ name: 'id' })
  productItems: ProductItem[];
}
