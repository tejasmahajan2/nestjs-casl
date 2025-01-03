import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[] | null> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity | null> {
    await this.userRepository.update({ id }, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete({ id });
  }

  async validateByEmail(email: string): Promise<UserEntity | null> {
    const userEntity = await this.userRepository.findOneBy({ email });
    if (!userEntity) throw new NotFoundException('User not found');
    return userEntity;
  }

  async validateByid(id: string): Promise<UserEntity | null> {
    const userEntity = await this.userRepository.findOneBy({ id });
    if (!userEntity) throw new NotFoundException('User not found');
    return userEntity;
  }

  async isExistByEmail(email: string): Promise<void> {
    const userEntity = await this.userRepository.findOneBy({ email });
    if (userEntity) throw new BadRequestException('User already exist');
  }
}
