import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from 'src/common/enums/role.enum';
import { HttpResponseDto } from 'src/common/dtos/http-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register(createUserDto: CreateUserDto) {
        // Validate user already exist or not?
        await this.usersService.isExistByEmail(createUserDto.email);

        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.role = Role.Admin;

        const createdUser = await this.usersService.create(createUserDto);

        const { email, role } = createdUser;

        return new HttpResponseDto(
            'Registration successful.',
            { email, role }
        );
    }

    async login(signInUserDto: CreateUserDto) {
        // Validate user already exist or not?
        const userEntity = await this.usersService.validateByEmail(signInUserDto.email);

        // Validate user password with stored hashed password
        if (!await bcrypt.compare(signInUserDto.password, userEntity.password)) {
            throw new BadRequestException('Incorrect password.');
        }

        // Generate jwt access token for user payload
        const payload = {
            uuid: userEntity.id,
            role: userEntity.role
        }

        const responseData = {
            accessToken: await this.jwtService.signAsync(payload),
            payload
        };;

        return new HttpResponseDto(
            'Login successful.',
            responseData
        );
    }

}
