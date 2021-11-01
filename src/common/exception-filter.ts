import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    let message = (exception as any).message.message;
    let error = 'Internal Server Error';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(exception);

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case QueryFailedError: // this is a TypeOrm error
        switch ((exception as any).code) {
          case '23505':
            status = HttpStatus.CONFLICT;
            message = 'Data already exists';
            error = 'Conflict';
            break;
          default:
            status = HttpStatus.UNPROCESSABLE_ENTITY;
            message = (exception as QueryFailedError).message;
            error = 'Query Error';
            break;
        }
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        break;
      case CannotCreateEntityIdMapError: // and another
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json(GlobalResponseError(status, error, message));
  }
}

export const GlobalResponseError = (
  statusCode: number,
  error?: string,
  message?: string,
): IResponseError => {
  if (message) {
    return {
      statusCode,
      message,
      error,
    };
  }

  return {
    statusCode,
    message: error,
  };
};

export interface IResponseError {
  statusCode: number;
  message?: string;
  error?: string;
}
