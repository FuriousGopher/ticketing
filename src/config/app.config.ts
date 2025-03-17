import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

export const configureApp = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  return {
    port: configService.get<number>('PORT') || 3000,
    isProduction: configService.get<string>('PRODUCTION') === 'true',
  };
};
