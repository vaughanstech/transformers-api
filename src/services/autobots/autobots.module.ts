import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AutobotsController } from './autobots.controller';
import { AutobotsService } from './autobots.service';

@Module({
  imports: [],
  controllers: [AutobotsController],
  providers: [AutobotsService, PrismaService],
})
export class AutobotsModule {}
