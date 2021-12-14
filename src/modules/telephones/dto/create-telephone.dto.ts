import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseCreateDto } from 'src/common/dto/base-create.dto';

export class CreateTelephoneDto extends BaseCreateDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsNumber()
  area_code: number;
}
