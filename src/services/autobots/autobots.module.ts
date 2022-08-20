import { Module } from '@nestjs/common';
import { AutobotsController } from './autobots.controller';
import { AutobotsService } from './autobots.service';

@Module({
  imports: [],
  controllers: [AutobotsController],
  providers: [AutobotsService],
})
export class AutobotsModule {}
