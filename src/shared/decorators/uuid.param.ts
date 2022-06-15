import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isValidUUID } from '@app/shared/utils/utils';

// by default it will catch `:id` params. Can pass string to decorator that ends with `Id` (i.e. zoneId)
// to check other ids as valid UUIDs
export const UuidParam = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const { params } = ctx.switchToHttp().getRequest();
    if (!data) {
      if (params.id) {
        return params.id;
      }
      return null;
    } else if (Boolean(data) && String(data).endsWith('Id')) {
      if (!isValidUUID(params[data])) {
        throw new HttpException(`Invalid UUID`, HttpStatus.BAD_REQUEST);
      } else {
        return params[data];
      }
    }
  },
);
