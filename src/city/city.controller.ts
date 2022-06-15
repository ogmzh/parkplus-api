import { UuidParam } from '@app/shared/decorators/uuid.param';
import { ApiValidationPipe } from '@app/shared/pipes/apiValidation.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { AddressDto } from '../address/interfaces/address.dto';
import { AddressData } from '../address/interfaces/address.response';
import { CityService } from './city.service';
import { CityDto } from './interfaces/city.dto';
import { CityData, CityResponse } from './interfaces/city.response';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async get(): Promise<CityResponse> {
    return await this.cityService.getAll();
  }

  @Get(':id')
  async getById(@UuidParam() id: string): Promise<CityData> {
    return await this.cityService.getById(id);
  }

  @Post()
  @UsePipes(new ApiValidationPipe())
  async create(@Body('city') city: CityDto): Promise<CityData> {
    return await this.cityService.save(city);
  }

  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async update(
    @UuidParam() id: string,
    @Body('city') city: CityDto,
  ): Promise<CityData> {
    return await this.cityService.update(id, city);
  }

  @Delete(':id')
  async delete(@UuidParam() id: string): Promise<void> {
    return await this.cityService.deleteCity(id);
  }

  @Post(':id/addresses')
  @UsePipes(new ApiValidationPipe())
  async addAddressToCity(
    @UuidParam() id: string,
    @Body('address') dto: AddressDto,
  ): Promise<AddressData> {
    return await this.cityService.createAddressInCity(id, dto);
  }
}
