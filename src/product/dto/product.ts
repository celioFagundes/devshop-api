import { Field, ObjectType } from '@nestjs/graphql'
import { CategoryPublic } from 'src/category/dto/category'
import { BrandPublic } from 'src/brand/dto/brand'
import { VariationPublic } from './variation'

@ObjectType('Product')
export class ProductPublic {
  @Field({ nullable: true })
  id: string
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  slug: string
  @Field({ nullable: true })
  description: string
  @Field({ nullable: true })
  category: CategoryPublic
  @Field({ nullable: true })
  brand: BrandPublic
  @Field(type => [VariationPublic!], { nullable: true })
  variations: VariationPublic[]
  @Field({ nullable: true })
  sizeType: string
  @Field(type => [String!], { nullable: true })
  images: string[]
}
