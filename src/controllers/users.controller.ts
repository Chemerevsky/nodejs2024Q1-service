import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.usersService.findByUserId(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.usersService.updateUserPassword(id, updatePasswordDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}