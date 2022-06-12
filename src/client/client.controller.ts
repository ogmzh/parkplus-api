import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiValidationPipe } from '../shared/pipes/apiValidation.pipe';
import { ClientService } from './client.service';
import { ClientDto } from './interfaces/client.dto';
import { ClientData, ClientResponse } from './interfaces/client.response';

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
}
