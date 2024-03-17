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
  HttpStatus,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.interface';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    if (!createUserDto.login) {
      throw new HttpException('Login is required', HttpStatus.BAD_REQUEST);
    }

    if (!createUserDto.password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    await this.usersService.updateUserPassword(id, updatePasswordDto.newPassword);

    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }

    return this.usersService.remove(id);
  }
}
