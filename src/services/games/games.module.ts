import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [],
  controllers: [GamesController],
  providers: [GamesService, PrismaService],
})
export class GamesModule {}
