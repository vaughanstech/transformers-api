import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AutobotsModule } from './services/autobots/autobots.module';
import { DecepticonsModule } from './services/decepticons/decepticons.module';

@Module({
  imports: [AutobotsModule, DecepticonsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
