import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() signInUserDto: CreateUserDto) {
        return await this.authService.login(signInUserDto);
    }
}