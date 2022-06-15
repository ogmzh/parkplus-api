import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isValidUUID } from '@app/shared/utils/utils';

export const UuidParam = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const { params } = ctx.switchToHttp().getRequest();
    if (!params.id) {
      return null;
    } else {
      // must have path param `:id`
      if (!isValidUUID(params.id)) {
        throw new HttpException(`Invalid UUID`, HttpStatus.BAD_REQUEST);
      }
    }
    return params.id;
  },
);
