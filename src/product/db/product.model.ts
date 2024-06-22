import { Column, Model, Table, DataType, ForeignKey, BelongsTo, BeforeCreate } from 'sequelize-typescript';
import { Category } from 'src/category/db/category.model';

@Table
export class Product extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false
  })
  description: string;

  @Column({ allowNull: false })
  price: number;

  @Column({
    type: DataType.STRING(8),
    allowNull: false,
    unique: true,
  })
  SKU: string;

  @ForeignKey(() => Category)
  @Column({ allowNull: false })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
