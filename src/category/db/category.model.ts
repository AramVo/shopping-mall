import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Product } from 'src/product/db/product.model';

@Table
export class Category extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  title: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false
  })
  description: string;

  @HasMany(() => Product, { onDelete: 'CASCADE' })
  product: Product;
}