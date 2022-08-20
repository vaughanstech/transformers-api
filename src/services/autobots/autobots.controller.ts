import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
      first_appearance_date?: number;
      first_appearance: string;
    },
  ): Promise<Autobots> {
    const { name, role, first_appearance_date, first_appearance } = postData;
    return this.autobotService.createAutobot({
      name,
      role,
      first_appearance_date,
      first_appearance,
    });
  }
}
