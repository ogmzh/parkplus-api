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
import { ClientUserData } from '@app/clientUser/interfaces/clientUser.response';
import { ApiValidationPipe } from '@app/shared/pipes/apiValidation.pipe';
import { ClientService } from './client.service';
import { ClientDto } from './interfaces/client.dto';
import {
  ClientData,
  ClientResponse,
  SingleClientData,
} from './interfaces/client.response';

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
  ): Promise<ClientData> {
    return await this.clientService.createClient(clientDto);
  }

  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async updateClient(
    @Body('client') clientDto: ClientDto,
    @Param('id') clientId: string,
  ): Promise<ClientData> {
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
  ): Promise<ClientUserData> {
    return this.clientService.addUserToClient(dto, clientId);
  }

  @Get(':id')
  @UsePipes(new ApiValidationPipe())
  async getClientById(
    @Param('id') clientId: string,
  ): Promise<SingleClientData> {
    return this.clientService.getById(clientId);
  }
}
