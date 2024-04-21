import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserSettingsDto } from '../websocket/dto/mesage.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getBots(): Promise<User[]> {
    return await this.userModel.find({ bot: true }).exec();
  }
  async getActiveUsers(): Promise<User[]> {
    return await this.userModel.find({ active: true }).exec();
  }

  async getUserByName(username: string): Promise<User> {
    let user = await this.userModel.findOne({ username }).exec();
    if (user === null) {
      user = await this.userModel.create({ username: username, active: true });
    }

    return user;
  }

  async updateUser(userSettingsDto: UserSettingsDto): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(
        { _id: userSettingsDto.userId },
        {
          points: userSettingsDto.points,
          multiplier: userSettingsDto.multiplier,
          active: true,
        },
      )
      .exec();

    return user;
  }
}
