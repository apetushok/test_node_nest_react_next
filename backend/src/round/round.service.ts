import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Round } from './schemas/round.schema';
import { Model } from 'mongoose';
import { CreateRoundDto, UpdateRoundDto } from './dto/round.dto';

@Injectable()
export class RoundService {
  constructor(@InjectModel(Round.name) private roundModel: Model<Round>) {}

  async getAll(): Promise<Round[]> {
    return this.roundModel.find().exec();
  }

  async getOne(id: string): Promise<Round> {
    const round = await this.roundModel.findById(id).exec();
    if (!round) {
      throw new NotFoundException('Round not found');
    }
    return round;
  }

  async create(createRoundDto: CreateRoundDto): Promise<Round> {
    const createdRound = new this.roundModel(createRoundDto);
    return createdRound.save();
  }

  async update(id: string, updateRoundDto: UpdateRoundDto): Promise<Round> {
    const updatedRound = await this.roundModel
      .findByIdAndUpdate(id, updateRoundDto)
      .exec();
    if (!updatedRound) {
      throw new NotFoundException('Round not found');
    }
    return updatedRound;
  }

  async delete(id: string): Promise<void> {
    const deletedRound = await this.roundModel.findByIdAndDelete(id).exec();
    if (!deletedRound) {
      throw new NotFoundException('Round not found');
    }
  }
}
