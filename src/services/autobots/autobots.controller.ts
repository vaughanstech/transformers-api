import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Autobots } from '@prisma/client';
import { AutobotsService } from './autobots.service';

@Controller('autobots')
export class AutobotsController {
  constructor(private readonly autobotService: AutobotsService) {}

  @Get('/')
  async getAutobot(
    @Param('id') id: number,
    @Param('name') name: string,
    @Param('role') role: string,
    @Param('first_appearance_date') first_appearance_date: number,
    @Param('first_appearance') first_appearance: string,
  ) {
    return this.autobotService.autobot({
      id,
      name,
      role,
      first_appearance_date,
      first_appearance,
    });
  }

  @Post('/')
  async postAutobot(
    @Body()
    postData: {
      name: string;
      role?: string;
      transforms_into?: string;
      description: string;
      first_appearance_date?: number;
      first_appearance: string;
    },
  ): Promise<Autobots> {
    const {
      name,
      role,
      transforms_into,
      description,
      first_appearance_date,
      first_appearance,
    } = postData;
    return this.autobotService.createAutobot({
      name,
      role,
      transforms_into,
      description,
      first_appearance_date,
      first_appearance,
    });
  }

  @Put('/')
  async updateAutobot(
    @Param('id') id: string,
    @Body()
    updateData: {
      name: string;
      role: string;
      transforms_into?: string;
      description: string;
      first_appearance_date: number;
      first_appearance: string;
    },
  ): Promise<Autobots> {
    const { name, role, transforms_into, description, first_appearance } =
      updateData;
    const first_appearance_date = Number(updateData.first_appearance_date);

    return this.autobotService.updateAutobot({
      where: { id: Number(id) },
      data: {
        name,
        role,
        transforms_into,
        description,
        first_appearance_date,
        first_appearance,
      },
    });
  }

  @Delete('/:id')
  async deleteAutobot(@Param('id') id: string): Promise<Autobots> {
    return this.autobotService.deleteAutobot({
      id: Number(id),
    });
  }
}
