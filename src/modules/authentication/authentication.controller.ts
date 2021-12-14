import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('authentication')
export class AuthenticationController {
  @UseGuards(AuthGuard('user-auth-local'))
  @Post('/user/login')
  async loginUser(@Request() req) {
    return req.user;
  }
}
