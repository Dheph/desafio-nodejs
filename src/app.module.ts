import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { mongoConstantsConnection } from './app.constants';
import { TelephonesModule } from './modules/telephones/telephones.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongoConstantsConnection.mongo_url),
    //MongooseModule.forRoot(
    //  'mongodb+srv://dhepherson:p2d2t3b9@cluster0.lcuym.mongodb.net/test',
    //),
    UsersModule,
    AuthenticationModule,
    TelephonesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
