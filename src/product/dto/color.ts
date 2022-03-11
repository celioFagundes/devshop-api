import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Color')
export class Color {
  @Field()
  colorName: string
  @Field()
  colorCode: string
}
