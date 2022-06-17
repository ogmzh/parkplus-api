import { UuidParam } from '@app/shared/decorators/uuid.param';
import { ApiValidationPipe } from '@app/shared/pipes/apiValidation.pipe';
import { Body, Controller, Delete, Get, Put, UsePipes } from '@nestjs/common';
import { ClientUserService } from './clientUser.service';
import { ClientUserDto } from './interfaces/clientUser.dto';
import { ClientUserEntry } from './interfaces/clientUser.response';

@Controller('client-users')
export class ClientUserController {
  constructor(private readonly clientUserService: ClientUserService) {}

  @Get(':id')
  @UsePipes(new ApiValidationPipe())
  async getById(@UuidParam() id: string): Promise<ClientUserEntry> {
    return await this.clientUserService.getById(id);
  }

  // POST (creation) goes through /clients controller as clientUser is a child

  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async updateUser(
    @UuidParam() id: string,
    @Body('clientUser') dto: ClientUserDto,
  ): Promise<ClientUserEntry> {
    return await this.clientUserService.update(id, dto);
  }

  @Delete(':id')
  async deleteUser(@UuidParam() id: string): Promise<void> {
    return await this.clientUserService.delete(id);
  }
}
