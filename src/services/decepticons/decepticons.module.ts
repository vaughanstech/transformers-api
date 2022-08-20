import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DecepticonsController } from './decepticons.controller';
import { DecepticonsService } from './decepticons.service';

@Module({
  imports: [],
  controllers: [DecepticonsController],
  providers: [DecepticonsService, PrismaService],
})
export class DecepticonsModule {}
