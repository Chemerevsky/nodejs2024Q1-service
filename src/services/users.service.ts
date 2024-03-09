import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDto, UpdatePasswordDto } from '../dto/users.dto';
import { validate, v4 as createUuid } from 'uuid';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    createUser(createUserDto: CreateUserDto) {
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
    }

    findAllUsers(): User[] {
        return this.users;
    }

    findByUserId(id: string): User {
        const isValidId: boolean = validate(id);
        console.log('is valid user: ' + isValidId);
        if (!isValidId) {
            return;
        }

        const user: User = this.users.find(u => u.id === id);
        return user;
    }

    updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto) {
        if (!validate(id)) {
            // 400
        }
        const user: User = this.users.find(u => u.id === id);
        if (!user) {
            // 404
        }
        if (user.password !== updatePasswordDto.oldPassword) {
            // 403
        }

        user.password = updatePasswordDto.newPassword;
    }

    deleteUser(id: string) {
        if (!validate(id)) {
            // 400
        }
        const user: User = this.users.find(u => u.id === id);
        if (!user) {
            // 404
        }

        this.users.splice(this.users.indexOf(user), 1);
    }
}