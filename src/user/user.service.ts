import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthToken } from './auth-token.entity'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuthToken)
    private authRepository: Repository<AuthToken>,
  ) {}
  async getAll(): Promise<User[]> {
    return this.userRepository.find()
  }
  async getById(id: string): Promise<User> {
    return this.userRepository.findOne(id)
  }
  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: [{ email }] })
  }
  async getAllUserSessions(id: string): Promise<AuthToken[]> {
    return this.authRepository.find({ where: [{ user: id }] })
  }
  async create(input: User): Promise<User> {
    return this.userRepository.save(input)
  }
  async update(input: User): Promise<User> {
    const entity = await this.userRepository.findOne(input.id)
    entity.name = input.name
    entity.email = input.email
    entity.password = input.password
    entity.role = input.role
    await this.userRepository.save(entity)
    return input
  }
  async changePassword(id: string, newPassword: string): Promise<boolean> {
    const entity = await this.userRepository.findOne(id)
    entity.password = newPassword
    await this.userRepository.save(entity)
    return true
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.userRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
  async auth(
    email: string,
    password: string,
    userAgent: string,
  ): Promise<[User, AuthToken]> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (user && (await user.checkPassword(password))) {
      const authToken = new AuthToken()
      authToken.user = user
      authToken.userAgent = userAgent
      const token = await this.authRepository.save(authToken)
      return [user, token]
    } else {
      return [null, null]
    }
  }
  async getRefreshToken(id: string): Promise<AuthToken> {
    const refreshToken = await this.authRepository.findOne(
      { id, active: true },
      {
        relations: ['user'],
      },
    )
    refreshToken.lastUsedAt = new Date()
    await this.authRepository.save(refreshToken)
    return refreshToken
  }
  async invalidateRefreshToken(id: string): Promise<boolean> {
    const refreshToken = await this.authRepository.findOne(id, {
      relations: ['user'],
    })
    refreshToken.active = false
    await this.authRepository.save(refreshToken)
    return true
  }
}
