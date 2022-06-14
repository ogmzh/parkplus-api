import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UuidParam } from '../shared/decorators/uuid.param';
import { ApiValidationPipe } from '../shared/pipes/apiValidation.pipe';
import { ClientUserService } from './clientUser.service';
import { ClientUserDto } from './interfaces/clientUser.dto';
import { ClientUserData } from './interfaces/clientUser.response';

@Controller('clientUsers')
export class ClientUserController {
  constructor(private readonly clientUserService: ClientUserService) {}

  @Get(':id')
  @UsePipes(new ApiValidationPipe())
  async getById(@Param('id') id: string): Promise<ClientUserData> {
    return await this.clientUserService.getById(id);
  }

  // POST (creation) goes through /clients controller as clientUser is a child

  @Put(':id')
  @UsePipes(new ApiValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body('clientUser') dto: ClientUserDto,
  ): Promise<ClientUserData> {
    return await this.clientUserService.update(id, dto);
  }

  @Delete(':id')
  async deleteUser(@UuidParam() id: string): Promise<void> {
    return await this.clientUserService.delete(id);
  }
}
