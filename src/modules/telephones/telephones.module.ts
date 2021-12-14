import { forwardRef, Module } from '@nestjs/common';
import { TelephonesService } from './telephones.service';
import { TelephonesController } from './telephones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Telephone, TelephoneSchema } from './entities/telephone.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Telephone.name, schema: TelephoneSchema },
    ]),
  ],
  controllers: [TelephonesController],
  providers: [TelephonesService],
  exports: [TelephonesService],
})
export class TelephonesModule {}
