import {
  AddressDto,
  RequestBodyAddressDto,
} from '@app/address/interfaces/address.dto';
import { AddressEntry } from '@app/address/interfaces/address.response';
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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CityDto, RequestBodyCityDto } from './interfaces/city.dto';
import { CityEntry, CityResponse } from './interfaces/city.response';

@ApiTags('cities')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({
    summary: 'Returns all cities. Cities have no country relation yet.',
  })
  @ApiResponse({
    status: 200,
    description: 'City entries',
    type: CityResponse,
  })
  @Get()
  async get(): Promise<CityResponse> {
    return await this.cityService.getAll();
  }

  @ApiOperation({
    summary: 'Returns a city by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Single city entry',
    type: CityEntry,
  })
  @Get(':id')
  async getById(@UuidParam() id: string): Promise<CityEntry> {
    return await this.cityService.getById(id);
  }

  @ApiOperation({ summary: 'Create a city.' })
  @ApiResponse({
    status: 200,
    description: 'Created city entry',
    type: CityEntry,
  })
  @ApiBody({ description: 'City DTO', type: RequestBodyCityDto })
  @Post()
  @UsePipes(new ApiValidationPipe())
  async create(@Body('city') city: CityDto): Promise<CityEntry> {
    return await this.cityService.save(city);
  }

  @ApiOperation({
    summary: 'Update a city.',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated city entry',
    type: CityEntry,
  })
  @ApiBody({ description: 'City DTO', type: RequestBodyCityDto })
  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async update(
    @UuidParam() id: string,
    @Body('city') city: CityDto,
  ): Promise<CityEntry> {
    return await this.cityService.update(id, city);
  }

  @ApiOperation({
    summary: 'Delete a city by id',
  })
  @ApiResponse({
    status: 200,
    description: 'void',
  })
  @Delete(':id')
  async delete(@UuidParam() id: string): Promise<void> {
    return await this.cityService.deleteCity(id);
  }

  @ApiOperation({
    summary: 'Create an address for a city.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the created address entry',
    type: AddressEntry,
  })
  @ApiBody({ description: 'Address DTO', type: RequestBodyAddressDto })
  @Post(':id/addresses')
  @UsePipes(new ApiValidationPipe())
  async addAddressToCity(
    @UuidParam() id: string,
    @Body('address') dto: AddressDto,
  ): Promise<AddressEntry> {
    return await this.cityService.createAddressInCity(id, dto);
  }
}
