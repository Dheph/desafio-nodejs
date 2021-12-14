import { Exclude } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { ToBoolean } from '../transformers/to-boolean-transform';
import { PaginationDto } from './pagination.dto';

export class FilterDto implements PaginationDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Exclude()
  page?: number;

  @Exclude()
  limit?: number;

  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  isDisabled?: boolean;
}
