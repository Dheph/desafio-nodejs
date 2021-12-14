import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
