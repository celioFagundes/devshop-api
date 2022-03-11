import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Brand } from 'src/brand/brand.entity'
import { Category } from 'src/category/category.entity'
import { S3 } from 'src/utils/s3'
import { Product } from './product.entity'
import { ProductResolver } from './product.resolver'
import { ProductService } from './product.service'
import { ProductSlugIsUnique } from './validations/ProductSlugIsUnique'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  providers: [ProductService, ProductResolver, ProductSlugIsUnique, S3],
})
export class ProductModule {}
