import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Product } from './db/product.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
  ],
})
export class ProductModule { }