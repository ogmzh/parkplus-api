import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ClientUserDto } from '@app/clientUser/interfaces/clientUser.dto';
import { ClientUserEntry } from '@app/clientUser/interfaces/clientUser.response';
import { ApiValidationPipe } from '@app/shared/pipes/apiValidation.pipe';
import { ClientService } from './client.service';
import { ClientDto } from './interfaces/client.dto';
import { ClientEntry, ClientResponse } from './interfaces/client.response';
import { UuidParam } from '@app/shared/decorators/uuid.param';
import { ZoneDto } from '@app/zone/interfaces/zone.dto';
import { ZoneEntry } from '@app/zone/interfaces/zone.response';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAllClients(): Promise<ClientResponse> {
    return await this.clientService.getAll();
  }

  @Post()
  @UsePipes(new ApiValidationPipe())
  async createClient(
    @Body('client') clientDto: ClientDto,
  ): Promise<ClientEntry> {
    return await this.clientService.createClient(clientDto);
  }

  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async updateClient(
    @Body('client') clientDto: ClientDto,
    @Param('id') clientId: string,
  ): Promise<ClientEntry> {
    return await this.clientService.updateClient(clientId, clientDto);
  }

  @Delete(':id')
  @UsePipes(new ApiValidationPipe())
  async deleteClient(@Param('id') clientId: string): Promise<void> {
    return await this.clientService.deleteClient(clientId);
  }

  @Post(':id/users')
  @UsePipes(new ApiValidationPipe())
  async createClientUser(
    @Body('clientUser') dto: ClientUserDto,
    @Param('id') clientId: string,
  ): Promise<ClientUserEntry> {
    return await this.clientService.addUserToClient(dto, clientId);
  }

  @Get(':id')
  @UsePipes(new ApiValidationPipe())
  async getClientById(@Param('id') clientId: string): Promise<ClientEntry> {
    return await this.clientService.getById(clientId);
  }

  @Post(':id/zones')
  @UsePipes(new ApiValidationPipe())
  async createZone(
    @UuidParam() clientId: string,
    @Body('zone') dto: ZoneDto,
  ): Promise<ZoneEntry> {
    return await this.clientService.createZone(clientId, dto);
  }
}
