import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const defaultMessage = 'An unexpected error occurred';
    const rawResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
          ? exception.message
          : defaultMessage;

    const rawMessage = Array.isArray(rawResponse)
      ? rawResponse.join(', ')
      : typeof rawResponse === 'object'
        ? JSON.stringify(rawResponse)
        : rawResponse;

    const errorPattern = /\{ Error massage: (.*?)\}\s*(.*)/;
    const matches = rawMessage.match(errorPattern);

    const statusMessage = matches ? matches[1] : `Failed to ${request.url}`;
    const errorDetails = matches ? [matches[2]] : [rawMessage];

    response.status(status).json({
      status: statusMessage,
      statusCode: status,
      errors: errorDetails,
    });
  }
}
