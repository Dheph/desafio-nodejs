import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../../common/validators/string/match.decorator';
import { BaseCreateDto } from '../../../common/dto/base-create.dto';
import { CreateTelephoneDto } from 'src/modules/telephones/dto/create-telephone.dto';

export class CreateUserDto extends BaseCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Match('password')
  passwordConfirmation: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  telephones: CreateTelephoneDto[];
}
