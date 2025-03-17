import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './config/app.config';
import { setupSwagger } from './config/swagger.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, isProduction } = configureApp(app);

  if (!isProduction) {
    setupSwagger(app);
  }

  await app.listen(port, '0.0.0.0', async () => {
    Logger.log(`Server is running at ${await app.getUrl()}`, 'main.ts');
  });
}
void bootstrap();
