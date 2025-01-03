import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpResponseDto } from 'src/common/dtos/http-response.dto';
import { AppAbility, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies, DeleteUserPolicyHandler } from '../casl/decorators/check-policies.decorator';
import { Action } from 'src/common/enums/action.enum';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard, PoliciesGuard)
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly caslAbilityFactory: CaslAbilityFactory

  ) { }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, UserEntity))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @CheckPolicies(new DeleteUserPolicyHandler())
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
    return new HttpResponseDto('User deleted successfully.');
  }
}
