import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Category } from './db/category.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Category]),
  ],
})
export class CategoryModule { }