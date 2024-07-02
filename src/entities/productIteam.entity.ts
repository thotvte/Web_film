import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Supplier } from './supplier.entity';
import { Products } from './product.entity';
import { DeliveryBillDetail } from './deliveryBillDetail.entity';

@Entity()
export class ProductItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column()
  rating: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'supplier_id' })
  supplierId: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Category, (category) => category.productItems)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Supplier, (supplier) => supplier.productItems)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ManyToMany(() => Products)
  @JoinTable({
    name: 'product_items_products',
    joinColumn: { name: 'product_item_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  products: Products[];

  @OneToOne(
    () => DeliveryBillDetail,
    (deliveryBillDetail) => deliveryBillDetail.productItem,
  )
  @JoinColumn({ name: 'id' })
  deliveryBillDetail: DeliveryBillDetail;
}
