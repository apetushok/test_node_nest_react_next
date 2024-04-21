import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { WsAdapter } from '@nestjs/platform-ws';

const configService = new ConfigService();

async function bootstrap() {
  try {
    const PORT = configService.get('PORT') || 3000;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.useWebSocketAdapter(new WsAdapter(app));

    return await app.listen(PORT, () =>
      console.log(`Server started on PORT ${PORT}`),
    );
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
