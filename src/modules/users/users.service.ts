import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { UserAuthService } from '../user-auth/user-auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TelephonesService } from '../telephones/telephones.service';
import { hashPasswordTransform } from '../../common/transformers/hash-password-transform';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @Inject(forwardRef(() => UserAuthService))
    private readonly userAuthService: UserAuthService,
    private readonly telephoneService: TelephonesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password, telephones } = createUserDto;
      const checkEmailExist = await this.userModel.findOne({
        email,
      });

      if (checkEmailExist) {
        throw new BadRequestException('Email Existente');
      }

      telephones.map(async (telephone) => {
        await this.telephoneService.checkTelephoneIsAvaible(telephone.number);
      });

      const hashPass = hashPasswordTransform.to(password);

      const user = new this.userModel({
        name,
        email,
        password: hashPass,
      });

      const userSaved = await user.save();

      telephones.map(async (telephone) => {
        await this.telephoneService.create({
          user_id: userSaved.id,
          number: telephone.number,
          area_code: telephone.area_code,
        });
      });

      const userData = await this.findOne({ id: userSaved.id });

      const data = {
        id: userData.id,
        created_at: userData.created_at,
        modified_at: userData.modified_at,
      };
      return data;
    } catch (err) {
      throw new BadRequestException('Ocorreu uma falha na criação do usuário');
    }
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    return user;
  }

  async findOne(findOneUserDto: FindOneUserDto) {
    const { id } = findOneUserDto;

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    const telephones = await this.telephoneService.findByUserId(id);

    const data = {
      id: user._id,
      email: user.email,
      telephones,
      created_at: user.created_at,
      modified_at: user.modified_at,
    };
    return data;
  }
}
