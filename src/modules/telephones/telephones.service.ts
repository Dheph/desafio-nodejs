import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { Telephone } from './entities/telephone.entity';

@Injectable()
export class TelephonesService {
  constructor(
    @InjectModel(Telephone.name)
    private telephoneModel: Model<Telephone>,
  ) {}

  async create(createTelephoneDto: CreateTelephoneDto) {
    try {
      const telephone = new this.telephoneModel(createTelephoneDto);

      await telephone.save();

      return;
    } catch {
      throw new BadRequestException(
        'Ocorreu uma falha na hora de salvar o telefone',
      );
    }
  }

  async checkTelephoneIsAvaible(number: number) {
    const telephone = await this.telephoneModel.findOne({
      number,
    });

    if (telephone) {
      throw new BadRequestException('Telefone Existente');
    }
    return;
  }
  async findByUserId(user_id: string) {
    const telephones = await this.telephoneModel.find({
      user_id,
    });

    if (!telephones) {
      throw new NotFoundException('Telephone de usuário não encontrado');
    }

    return telephones;
  }
}
