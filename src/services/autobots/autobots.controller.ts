import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Autobots } from '@prisma/client';
import { AutobotsService } from './autobots.service';

@Controller('autobots')
export class AutobotsController {
  constructor(private readonly autobotService: AutobotsService) {}

  @Get('/')
  async getAutobot(
    @Query('name') name: string,
    @Query('role') role: string,
    @Query('transforms_into') transforms_into: string,
    @Query('description') description: string,
    @Query('first_appearance_date') first_appearance_date: number,
    @Query('first_appearance') first_appearance: string,
  ) {
    return this.autobotService.autobot({
      name,
      role,
      transforms_into,
      description,
      first_appearance_date,
      first_appearance,
    });
  }

  @Post('/')
  @UseGuards(AuthGuard('basic'))
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

  @Put('/:name')
  @UseGuards(AuthGuard('basic'))
  async updateAutobot(
    @Param('name') name: string,
    @Body()
    updateData: {
      role: string;
      transforms_into?: string;
      description: string;
      first_appearance_date: number;
      first_appearance: string;
    },
  ): Promise<Autobots> {
    const { role, transforms_into, description, first_appearance } = updateData;
    const first_appearance_date = Number(updateData.first_appearance_date);

    return this.autobotService.updateAutobot({
      where: { name: String(name) },
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

  @Delete('/:name')
  @UseGuards(AuthGuard('basic'))
  async deleteAutobot(@Param('name') name: string): Promise<Autobots> {
    return this.autobotService.deleteAutobot({
      name: String(name),
    });
  }
}
