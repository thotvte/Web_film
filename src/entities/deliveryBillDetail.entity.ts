import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductItem } from './productIteam.entity';
import { DeliveryBill } from './deliveryBill.entity';

@Entity()
export class DeliveryBillDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ name: 'unit_price', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ name: 'delivery_bill_id' })
  deliveryBillId: number;

  @Column({ name: 'product_item_id' })
  productItemId: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @OneToOne(() => ProductItem, (productItem) => productItem.deliveryBillDetail)
  @JoinColumn({ name: 'product_item_id' })
  productItem: ProductItem;

  @ManyToOne(
    () => DeliveryBill,
    (deliveryBill) => deliveryBill.deliveryBillDetails,
  )
  @JoinColumn({ name: 'delivery_bill_id' })
  deliveryBill: DeliveryBill;
}
