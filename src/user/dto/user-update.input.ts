import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsUUID, Length, Validate } from 'class-validator'
import { UserRole } from '../user.entity'
import { UserEmailIsUnique } from '../validations/UserEmailIsUnique'

@InputType()
@ArgsType()
export class UserUpdateInput {
  @Field()
  @IsUUID()
  id: string

  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @IsEmail()
  @Validate(UserEmailIsUnique)
  email: string

  @Field(type => UserRole)
  role: UserRole
}
