// src/common/filters/prisma-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.BAD_REQUEST;
    let message = 'Error en la base de datos';

    switch (exception.code) {
      case 'P2002':
        message = `Registro duplicado: ${exception.meta?.target}`;
        break;
      case 'P2025':
        message = 'Registro no encontrado';
        status = HttpStatus.NOT_FOUND;
        break;
      default:
        message = exception.message;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
