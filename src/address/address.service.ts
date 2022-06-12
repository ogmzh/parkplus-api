import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressService {
  blyat() {
    return 'hello address service blyat';
  }
}
