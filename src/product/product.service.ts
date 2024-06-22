import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { randomBytes } from 'node:crypto';

import { Product } from './db/product.model';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) { }

  maxCreateAttemts = 5;

  generateSKU() {
    return randomBytes(8)
      .toString('base64')
      .replace(/[+/=]/g, '')
      .slice(0, 8);
  }

  async findAll() {
    return this.productModel.findAll();
  }

  async findById(id: number) {
    return this.productModel.findOne({
      where: { id }
    })
  }

  async update(dto: CreateProductDto, id: string) {
    return this.productModel.update(
      dto,
      { where: { id } }
    )
  }

  async create(dto: CreateProductDto) {
    let result;
    let attemtsCount: number;

    // Need to attempt a few times to ensure the SKU is unique
    for (attemtsCount = 0; attemtsCount < this.maxCreateAttemts; attemtsCount++) {
      try {
        const SKU = this.generateSKU();
        result = await this.productModel.create({ ...dto, SKU });
        break;
      } catch (e) {
        if (e.errors?.[0].path === 'SKU') continue;
        throw e;
      }
    }

    if (attemtsCount === this.maxCreateAttemts) {
      throw new Error('Can\'t create');
    }

    return result;
  }

  async deleteById(id: number) {
    return this.productModel.destroy({ where: { id } });
  }
}