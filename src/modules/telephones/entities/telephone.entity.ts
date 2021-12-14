import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TelephoneDocument = Telephone & Document;

@Schema()
export class Telephone {
  @Prop()
  number: number;

  @Prop()
  area_code: number;

  @Prop()
  user_id: string;
}

export const TelephoneSchema = SchemaFactory.createForClass(Telephone);
