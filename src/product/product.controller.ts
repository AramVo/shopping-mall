
import { Body, Controller, Get, Param, Post, Put, Req, Delete } from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { ValidationPipe } from 'src/pipes/validationPipe';

@Controller('/api/products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.productService.deleteById(+id);
  }

  @Put(':id')
  update(
    @Body(new ValidationPipe()) updateProductDto: CreateProductDto,
    @Param('id') id: string
  ) {
    return this.productService.update(updateProductDto, id);
  }

  @Post()
  create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}

