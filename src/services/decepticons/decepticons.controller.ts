import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
      transforms_into?: string;
      description: string;
      first_appearance_date?: number;
      first_appearance: string;
    },
  ): Promise<Decepticons> {
    const {
      name,
      role,
      transforms_into,
      description,
      first_appearance_date,
      first_appearance,
    } = postData;
    return this.decepticonsService.createDecepticon({
      name,
      role,
      transforms_into,
      description,
      first_appearance_date,
      first_appearance,
    });
  }

  @Put('/:id')
  async updateDecepticon(
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
  ): Promise<Decepticons> {
    const { name, role, transforms_into, description, first_appearance } =
      updateData;
    const first_appearance_date = Number(updateData.first_appearance_date);

    return this.decepticonsService.updateDecepticon({
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
  async deleteDecepticon(@Param('id') id: string): Promise<Decepticons> {
    return this.decepticonsService.deleteDecepticon({
      id: Number(id),
    });
  }
}
