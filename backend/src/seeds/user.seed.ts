import mongoose from 'mongoose';
import { UserDocument, UserSchema } from '../user/schemas/user.schema';
import { ConfigService } from '../config/config.service';

const configService = new ConfigService();

async function seedUsers(): Promise<void> {
  await mongoose.connect(configService.get('MONGODB_URI'));

  const UserModel = mongoose.model<UserDocument>('User', UserSchema);

  try {
    const users = [
      { username: 'CPU0', bot: true },
      { username: 'CPU1', bot: true },
      { username: 'CPU2', bot: true },
      { username: 'CPU3', bot: true },
    ];

    await UserModel.insertMany(users);
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedUsers();
