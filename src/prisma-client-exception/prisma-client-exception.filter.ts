import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorMessage = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002':
        const conflictStatus = HttpStatus.CONFLICT;
        response
          .status(conflictStatus)
          .json({
            statusCode: conflictStatus,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
            message: errorMessage,
          })
          .end();
        break;
      case 'P2025':
        const notFountStatus = HttpStatus.NOT_FOUND;
        response
          .status(notFountStatus)
          .json({
            statusCode: notFountStatus,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
            message: errorMessage,
          })
          .end();
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
