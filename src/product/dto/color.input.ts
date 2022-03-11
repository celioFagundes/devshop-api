import { Field, InputType } from '@nestjs/graphql'

@InputType('ColorInput')
export class ColorInput {
  @Field()
  colorName: string
  @Field()
  colorCode: string
}
