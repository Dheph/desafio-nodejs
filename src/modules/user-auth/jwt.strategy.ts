import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstantsUser } from './constants';
import { UserPayloadTokenDto } from './dto/user-payload-token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'user-auth-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstantsUser.secret,
      expiresIn: jwtConstantsUser.expiresIn,
    });
  }

  async validate(payload: UserPayloadTokenDto) {
    return { name: payload.name, email: payload.email, id: payload.id };
  }
}
