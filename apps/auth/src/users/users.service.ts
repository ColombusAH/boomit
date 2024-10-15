import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt();
      console.log(salt, 'dddd');
      const user = await this.usersRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, salt),
        salt,
      });
      return user;
    } catch (error) {
      console.log('1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      throw new BadRequestException('Credentials not valid');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  async getUser({ _id }: GetUserDto) {
    return this.usersRepository.findOne({ _id });
  }
}
