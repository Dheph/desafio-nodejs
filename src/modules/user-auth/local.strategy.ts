import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserPayloadTokenDto } from './dto/user-payload-token.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  'user-auth-local',
) {
  constructor(private userAuthService: UserAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserPayloadTokenDto> {
    const userPayloadToken = await this.userAuthService.validateUser({
      email,
      password,
    });

    if (!userPayloadToken) {
      throw new UnauthorizedException();
    }

    return userPayloadToken;
  }
}
