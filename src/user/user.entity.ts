import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { AuthToken } from './auth-token.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 450, nullable: false })
  email: string

  @Column({ length: 450, nullable: false })
  password: string

  @Column({ length: 450, nullable: false })
  role: string

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(() => AuthToken, authToken => authToken.user)
  authTokens: AuthToken[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
  @BeforeInsert()
  setCreatedDate(): void {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  setUpdatedDate(): void {
    this.updatedAt = new Date()
  }
  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}
