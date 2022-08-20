import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AutobotsModule } from './services/autobots/autobots.module';

@Module({
  imports: [AutobotsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
