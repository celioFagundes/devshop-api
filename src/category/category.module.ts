import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './category.entity'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'
import { CategorySlugIsUnique } from './validations/CategorySlugUnique'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService, CategorySlugIsUnique],
})
export class CategoryModule {}
