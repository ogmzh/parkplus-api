import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { isValidUUID } from '../utils/utils';

@Injectable()
export class ApiValidationPipe implements PipeTransform {
  async transform(value: any, { metatype, data, type }: ArgumentMetadata) {
    if (data === 'id' && type === 'param' && !isValidUUID(value)) {
      throw new HttpException({ errors: `invalid UUID` }, HttpStatus.NOT_FOUND);
    }
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length === 0) {
      console.log('returning value', value);
      return value;
    }
    throw new HttpException(
      { errors: this.formatErrors(errors) },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.map(error => ({
      [error.property]: Object.values(error.constraints),
    }));
  }
}
