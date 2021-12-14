import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/user-auth.dto';
import { compareSync } from 'bcrypt';
import { UserPayloadTokenDto } from './dto/user-payload-token.dto';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userAuthDto: UserAuthDto) {
    const user = await this.userService.findOneByEmail(userAuthDto.email);

    const validatePassword = compareSync(userAuthDto.password, user.password);
    if (!validatePassword) {
      throw new BadRequestException('Email e senha não coincidem');
    }

    const { id, name, email } = user;

    const token = await this.login({
      id,
      name,
      email,
      token: '',
    });

    return {
      id,
      name,
      email,
      token,
    };
  }

  async login(user: UserPayloadTokenDto) {
    return this.jwtService.sign(user);
  }
}
