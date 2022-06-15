import { UuidParam } from '@app/shared/decorators/uuid.param';
import { Body, Controller, Delete, Get, Put, UsePipes } from '@nestjs/common';
import { ApiValidationPipe } from '../shared/pipes/apiValidation.pipe';
import { AddressService } from './address.service';
import { AddressDto } from './interfaces/address.dto';
import { AddressData } from './interfaces/address.response';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  async getById(@UuidParam() id: string): Promise<AddressData> {
    return await this.addressService.getById(id);
  }

  @Delete(':id')
  async deleteById(@UuidParam() id: string): Promise<void> {
    return await this.addressService.deleteAddress(id);
  }

  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async updateAddress(
    @UuidParam() id: string,
    @Body('address') dto: AddressDto,
  ): Promise<AddressData> {
    return await this.addressService.updateAddress(id, dto);
  }
}
