import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { BaseEmailDto } from './base-email.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends BaseEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  role?: Role;
}
