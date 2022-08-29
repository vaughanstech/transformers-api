import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
})
export class MoviesModule {}
