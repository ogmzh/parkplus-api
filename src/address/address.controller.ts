import { UuidParam } from '@app/shared/decorators/uuid.param';
import { Body, Controller, Delete, Get, Put, UsePipes } from '@nestjs/common';
import { ApiValidationPipe } from '@app/shared/pipes/apiValidation.pipe';
import { AddressService } from './address.service';
import { AddressDto, RequestBodyAddressDto } from './interfaces/address.dto';
import { AddressEntry } from './interfaces/address.response';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({
    summary: 'Returns an address by id.',
  })
  @ApiResponse({
    status: 200,
    type: AddressEntry,
  })
  @Get(':id')
  async getById(@UuidParam() id: string): Promise<AddressEntry> {
    return await this.addressService.getById(id);
  }

  @ApiOperation({
    summary: 'Delete an address by id',
  })
  @ApiResponse({
    status: 200,
    description: 'void',
  })
  @Delete(':id')
  async deleteById(@UuidParam() id: string): Promise<void> {
    return await this.addressService.deleteAddress(id);
  }

  @ApiOperation({
    summary: 'Update an address',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated address entry',
    type: AddressEntry,
  })
  @ApiBody({ description: 'address dto', type: RequestBodyAddressDto })
  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async updateAddress(
    @UuidParam() id: string,
    @Body('address') dto: AddressDto,
  ): Promise<AddressEntry> {
    return await this.addressService.updateAddress(id, dto);
  }
}
