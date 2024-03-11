import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';
import { User, UserResponse } from '../interfaces/user.interface';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    const userResponse: UserResponse = this.usersService.findByUserId(id);
    if (userResponse.isError) {
      throw new HttpException(
        userResponse.errorMessage,
        userResponse.statusCode,
      );
    }

    return userResponse.data;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const userResponse: UserResponse =
      this.usersService.createUser(createUserDto);
    if (userResponse.isError) {
      throw new HttpException(
        userResponse.errorMessage,
        userResponse.statusCode,
      );
    }

    return userResponse.data;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const userResponse: UserResponse = this.usersService.updateUserPassword(
      id,
      updatePasswordDto,
    );
    if (userResponse.isError) {
      throw new HttpException(
        userResponse.errorMessage,
        userResponse.statusCode,
      );
    }

    return userResponse.data;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    const userResponse: UserResponse = this.usersService.deleteUser(id);
    if (userResponse.isError) {
      throw new HttpException(
        userResponse.errorMessage,
        userResponse.statusCode,
      );
    }
  }
}
