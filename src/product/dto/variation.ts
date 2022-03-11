import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { Color } from './color'

@ObjectType('VariationPublic')
export class VariationPublic {
  @Field(type => Color)
  color: Color
  @Field()
  size: string
  @Field(type => [String!])
  voltage: string[]
  @Field()
  sku: string
  @Field(type => Float)
  price: number
  @Field(type => Float)
  weight: number
  @Field(type => Int)
  stock: number
}
