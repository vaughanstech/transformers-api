import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Decepticons } from '@prisma/client';
import { DecepticonsService } from './decepticons.service';

@Controller('decepticons')
export class DecepticonsController {
  constructor(private readonly decepticonsService: DecepticonsService) {}

  @Get('/')
  async getDecepticon(
    @Param('id') id: number,
    @Param('name') name: string,
    @Param('role') role: string,
    @Param('first_appearance_date') first_appearance_date: number,
    @Param('first_appearance') first_appearance: string,
  ) {
    return this.decepticonsService.decepticon({
      id,
      name,
      role,
      first_appearance_date,
      first_appearance,
    });
  }

  @Post('/')
  async postDecepticon(
    @Body()
    postData: {
      name: string;
      role?: string;
      first_appearance_date?: number;
      first_appearance: string;
    },
  ): Promise<Decepticons> {
    const { name, role, first_appearance_date, first_appearance } = postData;
    return this.decepticonsService.createDecepticon({
      name,
      role,
      first_appearance_date,
      first_appearance,
    });
  }
}
