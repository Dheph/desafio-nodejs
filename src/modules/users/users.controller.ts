import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user')
  @UseGuards(AuthGuard('user-auth-jwt'))
  me(@Request() req) {
    const { user } = req;
    return this.usersService.findOne({ id: user.id });
  }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
