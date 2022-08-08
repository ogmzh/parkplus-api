import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictingResourceException extends HttpException {
  constructor(property: string, value: string, message = 'already in use') {
    super(
      { errors: [{ [property]: [`${property}: ${value} ${message}`] }] },
      HttpStatus.CONFLICT,
    );
  }
}
