import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Supplier } from './Supplier';
import { StockMovement } from './StockMovement';
import { SaleItem } from './SaleItem';

@Entity('Products')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text', nullable: true })     
    description!: string | null;

    @Column({ type: 'varchar', length: 100 })
    category!: string;

    @Column({ type: 'varchar', length: 50, default: 'anunciado' })
    status!: string;

    @Column({ type: 'text', nullable: true })   
    imageBase64!: string | null;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    purchase_price!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    sale_price!: number;

    @Column({ type: 'int', default: 0 })
    quantity!: number;

    @Column({ type: 'timestamp', default: () => 'NOW()' })  
    date!: Date;

    @Column()
    supplierId!: number;

    @ManyToOne(() => Supplier, (supplier) => supplier.products)
    @JoinColumn({ name: 'supplierId' })
    supplier!: Supplier;

    @OneToMany(() => StockMovement, (movement) => movement.product)
    stockMovements!: StockMovement[];

    @OneToMany(() => SaleItem, (item) => item.product)
    saleItems!: SaleItem[];
}