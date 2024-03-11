import { Injectable, HttpStatus } from '@nestjs/common';
import { User, UserResponse } from '../interfaces/user.interface';
import { CreateUserDto, UpdatePasswordDto } from '../dto/users.dto';
import { validate, v4 as createUuid } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  createUser(createUserDto: CreateUserDto): UserResponse {
    if (!createUserDto.login) {
      return {
        isError: true,
        statusCode: HttpStatus.BAD_REQUEST,
        errorMessage: 'Login is required',
      };
    }

    if (!createUserDto.password) {
      return {
        isError: true,
        statusCode: HttpStatus.BAD_REQUEST,
        errorMessage: 'Password is required',
      };
    }

    const currentTime: number = Date.now();
    const newUser: User = {
      id: createUuid(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 0,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
    this.users.push(newUser);

    return {
      isError: false,
      data: newUser,
    };
  }

  findAllUsers(): User[] {
    return this.users;
  }

  findByUserId(id: string): UserResponse {
    const isValidId: boolean = validate(id);
    if (!isValidId) {
      return {
        isError: true,
        errorMessage: 'Id is invalid',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

    const user: User = this.users.find((u) => u.id === id);
    if (!user) {
      return {
        isError: true,
        errorMessage: 'User was not found',
        statusCode: HttpStatus.NOT_FOUND,
      };
    }

    return {
      data: user,
      isError: false,
    };
  }

  updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): UserResponse {
    if (!validate(id)) {
      return {
        isError: true,
        errorMessage: 'Id is invalid',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    const user: User = this.users.find((u) => u.id === id);
    if (!user) {
      return {
        isError: true,
        errorMessage: 'User was not found',
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      return {
        isError: true,
        errorMessage: 'Old password is wrong',
        statusCode: HttpStatus.FORBIDDEN,
      };
    }

    user.password = updatePasswordDto.newPassword;
    return {
      isError: false,
      data: user,
    };
  }

  deleteUser(id: string): UserResponse {
    if (!validate(id)) {
      return {
        isError: true,
        errorMessage: 'Id is invalid',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

    const user: User = this.users.find((u) => u.id === id);
    if (!user) {
      return {
        isError: true,
        errorMessage: 'User was not found',
        statusCode: HttpStatus.NOT_FOUND,
      };
    }

    this.users.splice(this.users.indexOf(user), 1);

    return {
      isError: false,
    };
  }
}
