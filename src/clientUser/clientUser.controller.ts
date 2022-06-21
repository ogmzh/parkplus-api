import { UuidParam } from '@app/shared/decorators/uuid.param';
import { ApiValidationPipe } from '@app/shared/pipes/apiValidation.pipe';
import { Body, Controller, Delete, Get, Put, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientUserService } from './clientUser.service';
import {
  ClientUserDto,
  RequestBodyClientUserDto,
} from './interfaces/clientUser.dto';
import { ClientUserEntry } from './interfaces/clientUser.response';

@ApiTags('client-users')
@Controller('client-users')
export class ClientUserController {
  constructor(private readonly clientUserService: ClientUserService) {}

  @ApiOperation({ summary: 'Returns the client user by id' })
  @ApiResponse({ status: 200, type: ClientUserEntry })
  @Get(':id')
  @UsePipes(new ApiValidationPipe())
  async getById(@UuidParam() id: string): Promise<ClientUserEntry> {
    return await this.clientUserService.getById(id);
  }

  @ApiOperation({ summary: 'Update a client user' })
  @ApiResponse({
    status: 200,
    description: 'Updated client user entry',
    type: ClientUserEntry,
  })
  @ApiBody({ description: 'client user dto', type: RequestBodyClientUserDto })
  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async updateUser(
    @UuidParam() id: string,
    @Body('clientUser') dto: ClientUserDto,
  ): Promise<ClientUserEntry> {
    return await this.clientUserService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete an client user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'void',
  })
  @Delete(':id')
  async deleteUser(@UuidParam() id: string): Promise<void> {
    return await this.clientUserService.delete(id);
  }
}
