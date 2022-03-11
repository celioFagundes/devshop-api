import { Field, ObjectType } from '@nestjs/graphql'
import { UserRole } from '../user.entity'

@ObjectType('User')
export class UserPublic {
  @Field({ nullable: true })
  id: string
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  email: string
  @Field()
  role: string
}
