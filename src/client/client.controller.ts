import {
  ClientUserDto,
  RequestBodyClientUserDto,
} from '@app/clientUser/interfaces/clientUser.dto';
import { ClientUserEntry } from '@app/clientUser/interfaces/clientUser.response';
import { UuidParam } from '@app/shared/decorators/uuid.param';
import { ApiValidationPipe } from '@app/shared/pipes/apiValidation.pipe';
import { RequestBodyZoneDto, ZoneDto } from '@app/zone/interfaces/zone.dto';
import { ZoneEntry } from '@app/zone/interfaces/zone.response';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ParkingMachineEntry } from '@app/parkingMachine/interfaces/parkingMachine.interface';
import { ClientService } from './client.service';
import { ClientDto, RequestBodyClientDto } from './interfaces/client.dto';
import { ClientEntry, ClientResponse } from './interfaces/client.response';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({
    summary: 'Returns all clients.',
  })
  @ApiResponse({
    status: 200,
    description: 'Client entries',
    type: ClientResponse,
  })
  @Get()
  async getAllClients(): Promise<ClientResponse> {
    return await this.clientService.getAll();
  }

  @ApiOperation({ summary: 'Create a client.' })
  @ApiResponse({
    status: 200,
    description: 'Created client entry',
    type: ClientEntry,
  })
  @ApiBody({ description: 'Client DTO', type: RequestBodyClientDto })
  @Post()
  @UsePipes(new ApiValidationPipe())
  async createClient(
    @Body('client') clientDto: ClientDto,
  ): Promise<ClientEntry> {
    return await this.clientService.createClient(clientDto);
  }

  @ApiOperation({ summary: 'Update a client.' })
  @ApiResponse({
    status: 200,
    description: 'Updated client entry',
    type: ClientEntry,
  })
  @ApiBody({ description: 'Client DTO', type: RequestBodyClientDto })
  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async updateClient(
    @Body('client') clientDto: ClientDto,
    @UuidParam() clientId: string,
  ): Promise<ClientEntry> {
    return await this.clientService.updateClient(clientId, clientDto);
  }

  @ApiOperation({
    summary: 'Delete a client by id',
  })
  @ApiResponse({
    status: 200,
    description: 'void',
  })
  @Delete(':id')
  @UsePipes(new ApiValidationPipe())
  async deleteClient(@UuidParam() clientId: string): Promise<void> {
    return await this.clientService.deleteClient(clientId);
  }

  @ApiOperation({ summary: "Create a client's user." })
  @ApiResponse({
    status: 200,
    description: 'Created client user entry',
    type: ClientUserEntry,
  })
  @ApiBody({ description: 'Client DTO', type: RequestBodyClientUserDto })
  @Post(':id/users')
  @UsePipes(new ApiValidationPipe())
  async createClientUser(
    @Body('clientUser') dto: ClientUserDto,
    @UuidParam() clientId: string,
  ): Promise<ClientUserEntry> {
    return await this.clientService.addUserToClient(dto, clientId);
  }

  @ApiOperation({
    summary: 'Returns a client by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Client entry',
    type: ClientEntry,
  })
  @Get(':id')
  @UsePipes(new ApiValidationPipe())
  async getClientById(@UuidParam() clientId: string): Promise<ClientEntry> {
    return await this.clientService.getById(clientId);
  }

  @ApiOperation({ summary: "Create a client's zone." })
  @ApiResponse({
    status: 200,
    description: 'Created clients zone',
    type: ZoneEntry,
  })
  @ApiBody({ description: 'Client DTO', type: RequestBodyZoneDto })
  @Post(':id/zones')
  @UsePipes(new ApiValidationPipe())
  async createZone(
    @UuidParam() clientId: string,
    @Body('zone') dto: ZoneDto,
  ): Promise<ZoneEntry> {
    return await this.clientService.createZone(clientId, dto);
  }

  @ApiOperation({ summary: "Create a client's machine." })
  @ApiResponse({
    status: 200,
    description: "Created client's machine ",
    type: ParkingMachineEntry,
  })
  @Post(':id/zones/:zoneId/machines')
  async createMachineInZone(
    @UuidParam() clientId: string,
    @UuidParam('zoneId') zoneId: string,
  ): Promise<ParkingMachineEntry> {
    return await this.clientService.createMachineInZone(clientId, zoneId);
  }
}
