import { Module } from '@nestjs/common';
import { RoundModule } from './round/round.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { WebsocketModule } from './websocket/websocket.module';
import { UserModule } from './user/user.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule,
    WebsocketModule,
    RoundModule,
    UserModule,
    MongooseModule.forRoot(configService.get('MONGODB_URI')),
  ],
})
export class AppModule {}
