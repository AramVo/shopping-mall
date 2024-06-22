import { IsInt, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsInt()
  categoryId: number;
}