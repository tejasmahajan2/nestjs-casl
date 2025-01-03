import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseEmailDto } from 'src/modules/users/dto/base-email.dto';

export class SignInUserDto extends BaseEmailDto {
    @ApiProperty()
    @IsNotEmpty()
    password: string;
 }
