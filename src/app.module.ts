import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { AutobotsModule } from './services/autobots/autobots.module';
import { DecepticonsModule } from './services/decepticons/decepticons.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    AutobotsModule,
    DecepticonsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
