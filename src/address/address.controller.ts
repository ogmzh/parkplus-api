import { Controller, Get } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  asdf() {
    return this.addressService.blyat();
  }
}
