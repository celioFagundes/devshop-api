import { Field, InputType } from '@nestjs/graphql'
import { IsUUID, Length } from 'class-validator'

@InputType()
export class UserChangePasswordInput {
  @Field()
  @IsUUID()
  id: string

  @Field()
  @Length(3)
  password: string
}
