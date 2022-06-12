import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async get() {
    return this.cityService.test();
  }
}
