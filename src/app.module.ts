import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { Category } from './category/db/category.model';
import { Product } from './product/db/product.model';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forFeature([Product]),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: configService.get('NODE_ENV') === 'dev',
          sync: { alter: configService.get('NODE_ENV') === 'dev' },
          autoLoadModels: true,
          models: [
            Category,
            Product,
          ],
        }
      },
      inject: [ConfigService],
    }),
    CategoryModule,
    ProductModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule { }