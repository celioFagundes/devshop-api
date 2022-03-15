import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { ColorInput } from './color.input'

@InputType()
export class VariationInput {
  @Field(type => ColorInput)
  color: ColorInput
  @Field()
  size: string
  @Field()
  sku: string
  @Field(type => Float)
  price: number
  @Field(type => Float)
  weight: number
  @Field(type => Int)
  stock: number
}
