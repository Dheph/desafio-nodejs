import { forwardRef, Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstantsUser } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: jwtConstantsUser.secret,
      signOptions: { expiresIn: jwtConstantsUser.expiresIn },
    }),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, LocalStrategy, JwtStrategy],
  exports: [UserAuthService],
})
export class UserAuthModule {}
