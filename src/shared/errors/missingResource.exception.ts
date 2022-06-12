import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingResourceException extends HttpException {
  constructor(property: string, value: string, message = 'not found') {
    super(
      { errors: [{ [property]: [`${property}: ${value} ${message}`] }] },
      HttpStatus.NOT_FOUND,
    );
  }
}
