import { HttpException, HttpStatus } from '@nestjs/common';

type HttpResponse = any | any[];

interface ResponsePayload {
  statusCode: number;
  message?: string;
  data?: any | any[];
  error?: any | any[];
}

type ResponsePayloadData = {
  message?: string;
  data?: any | any[];
};

type ResponsePayloadError = {
  message?: string;
  error?: any | any[];
};

class Response {
  static resp: ResponsePayload;

  static created(param?: ResponsePayloadData): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.CREATED;
    this.resp.message = param?.message ? param.message : 'Created';
    param?.data ? (this.resp.data = param.data) : false;
    return this.resp;
  }

  static success(param?: ResponsePayloadData): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.OK;
    this.resp.message = param?.message ? param.message : 'Success';
    param?.data && (this.resp.data = param.data);
    return new HttpException({ ...this.resp }, HttpStatus.OK).getResponse();
  }

  static error(error?: ResponsePayloadError): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.resp.error = error ? error : 'Internal Server Error';
    return this.resp;
  }

  static badrequest(message?: string): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.BAD_REQUEST;
    this.resp.message = message ? message : 'Bad Request';
    return this.resp;
  }

  static serviceunavailable(message?: string): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.SERVICE_UNAVAILABLE;
    this.resp.message = message ? message : 'Service Unavailable';
    return this.resp;
  }

  static notfound(message?: string): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.NOT_FOUND;
    this.resp.message = message ? message : 'No Data Found';
    return this.resp;
  }

  static notmodified(message?: string): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.NOT_FOUND;
    this.resp.message = message ? message : 'Not Modified';
    return this.resp;
  }

  static unauthorized(message?: string): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.UNAUTHORIZED;
    this.resp.message = message ? message : 'Unauthorized';
    return this.resp;
  }

  static forbidden(message?: string): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.FORBIDDEN;
    this.resp.message = message ? message : 'Forbidden';
    return this.resp;
  }

  static conflict(message?: string): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.CONFLICT;
    this.resp.message = message ? message : 'Conflict';
    return this.resp;
  }

  static gone(message?: string): HttpResponse {
    this.clear();
    this.resp.statusCode = HttpStatus.GONE;
    this.resp.message = message ? message : 'Created';
    return this.resp;
  }

  static clear() {
    this.resp = { statusCode: 0 };
  }
}

export { Response, HttpResponse };
