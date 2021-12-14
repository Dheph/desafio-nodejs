import { Exclude } from 'class-transformer';

export class BaseCreateDto {
  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  isDisabled?: boolean;
}
