import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/users.dto';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const currentDate: number = Date.now();
    const user = new User();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.createdAt = currentDate;
    user.updatedAt = currentDate;

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  updateUserPassword(id: string, newPassword: string): Promise<UpdateResult> {
    return this.usersRepository.update(
      { id: id },
      { password: newPassword, updatedAt: Date.now() },
    );
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
